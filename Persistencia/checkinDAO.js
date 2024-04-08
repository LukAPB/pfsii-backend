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
        if (isNaN(termoBusca)) { //assegurando que seja um código de checkin do tipo inteiro
            const conexao = await conectar();
            const sql = `select * from checkin`;
            const registros = await conexao.execute(sql);
            const dadosHospede = [];
            for (const registro of registros[0]) {
                const hospede = new Hospede(registro.hospede_codigo);
                hospede.consultar(registro.hospede_codigo  ).then((dadosHospede) => {
                    console.log("Dados Hospede", dadosHospede)
                 dadosHospede = dadosHospede[0];
                });
                const acomodacao = new Acomodacao(registro.acomodacao_codigo);
                const checkin = new Checkin(registro.codigo, dadosHospede, registro.data_checkin, registro.hosp_qtd, acomodacao);
                listaCheckins.push(checkin);
            }
        }

        return listaCheckins;

    }
}