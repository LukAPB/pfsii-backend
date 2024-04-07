import Acomodacao from '../Modelo/acomodacao.js';
import conectar from './conexao.js';

export default class AcomodacaoDAO {

    async gravar(acomodacao) {
        if (acomodacao instanceof Acomodacao) {
            const sql = `INSERT INTO acomodacao(prod_descricao, prod_precoCusto,
                prod_precoVenda, prod_dataValidade, prod_qtdEstoque, cat_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [acomodacao.descricao, acomodacao.precoCusto, acomodacao.precoVenda,
            acomodacao.dataValidade, acomodacao.qtdEstoque, acomodacao.categoria.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            acomodacao.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(acomodacao) {
        if (acomodacao instanceof Acomodacao) {
            const sql = `UPDATE acomodacao SET prod_descricao = ?, prod_precoCusto = ?,
            prod_precoVenda = ?, prod_dataValidade = ?, prod_qtdEstoque = ?, cat_codigo = ?
            WHERE prod_codigo = ?`;
            const parametros = [acomodacao.descricao, acomodacao.precoCusto, acomodacao.precoVenda,
            acomodacao.dataValidade, acomodacao.qtdEstoque, acomodacao.categoria.codigo, acomodacao.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(acomodacao) {
        if (acomodacao instanceof Acomodacao) {
            const sql = `DELETE FROM acomodacao WHERE prod_codigo = ?`;
            const parametros = [acomodacao.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaAcomodacaos = [];
        if (isNaN(parseInt(termo))){
            //consulta pelo código do acomodacao
            const sql = `SELECT * FROM acomodacao p `;
            const [registros, campos] = await conexao.execute(sql);
            for (const registro of registros){
                const acomodacao = new Acomodacao(registro.codigo,registro.tipo,
                                            registro.descricao,registro.capacidade);
                listaAcomodacaos.push(acomodacao);
            }
        }
        else
        {
            //consulta pela descrição do acomodacao
            const sql = `SELECT p.prod_codigo, p.prod_descricao,
              p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, 
              p.prod_qtdEstoque, c.cat_codigo, c.cat_descricao
              FROM acomodacao p 
              INNER JOIN categoria c ON p.cat_codigo = c.cat_codigo
              WHERE p.prod_descricao like ?
              ORDER BY p.prod_descricao               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const categoria = new Categoria(registro.cat_codigo, registro.cat_descricao);
                const acomodacao = new Acomodacao(registro.prod_codigo,registro.prod_descricao,
                                            registro.prod_precoCusto,registro.prod_precoVenda,
                                            registro.prod_dataValidade, registro.prod_qtdEstoque,
                                            categoria
                                            );
                listaAcomodacaos.push(acomodacao);
            }
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaAcomodacaos;
    }
}