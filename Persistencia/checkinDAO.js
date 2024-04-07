import Checkin from "../Modelo/checkin.js";
import Hospede from "../Modelo/hospede.js";
import Acomodacao from "../Modelo/acomodacao.js";
import conectar from "./conexao.js";

export default class CheckinDao {
    async gravar(checkin) {
        console.log('checkin', checkin)
        if (checkin instanceof Checkin) {
            const sql = `INSERT INTO checkin(hospede_codigo ,
                acomodacao_codigo , data_checkin , hosp_qtd)
                VALUES(?,?,?,?)`;
            const parametros = [checkin.hospede, checkin.acomodacao,
            checkin.data, checkin.total];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            checkin.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(checkin) {
        if (checkin instanceof Checkin) {
            const sql = `UPDATE acomodacao SET hospede_codigo = ?, acomodacao_codigo = ?,
            data_checkin = ?, hosp_qtd = ?, hosp_qtd = ?
            WHERE codigo = ?`;
            const parametros = [checkin.hospede_codigo, checkin.acomodacao_codigo,
            checkin.data_checkin, checkin.hosp_qtd, checkin.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async excluir(checkin) {

    }

    async consultar(termoBusca) {
        const listaCheckins = [];
        if (!isNaN(termoBusca)) { //assegurando que seja um código de checkin do tipo inteiro
            const conexao = await conectar();
            const sql = `SELECT p.codigo, p.hospede_codigo, p.data_checkin, p.total,
                        c.nome, c.endereco, c.telefone,
                        prod.prod_descricao, prod.prod_precoCusto, prod.prod_precoVenda, prod.prod_dataValidade, prod.prod_qtdEstoque,
                        cat.cat_codigo, cat.cat_descricao,
                        i.acomodacao_codigo, i.quantidade, i.preco_unitario, i.quantidade * i.preco_unitario as subtotal
                        FROM checkin as p
                        INNER JOIN hospede as c ON p.hospede_codigo = c.codigo
                        INNER JOIN checkin_acomodacao as i ON i.checkin_codigo = p.codigo
                        INNER JOIN acomodacao as prod ON prod.prod_codigo = i.acomodacao_codigo
                        INNER JOIN categoria as cat ON prod.cat_codigo = cat.cat_codigo
                        WHERE p.codigo = ?`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);

            if (registros.length > 0) {

                // a partir dos registros precisaremos restaurar os objetos
                const hospede = new Hospede(registros[0].hospede_codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
                let listaItensCheckin = [];
                for (const registro of registros) {
                    const categoria = new Categoria(registro.cat_codigo, registro.cat_descricao);
                    const acomodacao = new Acomodacao(registro.acomodacao_codigo, registro.prod_descricao, registro.prod_precoCusto, registro.prod_precoVenda, registro.prod_dataValidade, registro.prod_qtdEstoque, categoria);


                }
                const checkin = new Checkin(registros[0].codigo, hospede, registros[0].data_checkin, registros[0].total, listaItensCheckin);
                listaCheckins.push(checkin);
            }

        }

        return listaCheckins;

    }
}