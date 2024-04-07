import Hospede from "../Modelo/hospede.js";
import Checkin from "../Modelo/checkin.js";
import Acomodacao from "../Modelo/acomodacao.js";


export default class CheckinCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        console.log("requisicao", requisicao.body)

        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            // Extraindo dados de um novo checkin
            const hospedeCodigo = dados.hospede_codigo;
            const acomodacaoCodigo = dados.acomodacao_codigo;
            const dataCheckin1 = dados.data_checkin;
            const dataCheckin = dataCheckin1.replace(" ", "T");

            // Instanciando objetos do tipo Hospede e Acomodacao

            function gerarIdInteiro(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const checkin = new Checkin(gerarIdInteiro(1, 9999), hospedeCodigo, dataCheckin, dados.hosp_qtd, acomodacaoCodigo);
            console.log("Ajuda", JSON.stringify(checkin))

            // Resolver a promise
            checkin.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Checkin registrado com sucesso!",
                    "codigo": checkin.codigo
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar o checkin: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            // Tentar obter o código do check-in a partir dos parâmetros da URL
            let codigoCheckin = requisicao.params.codigoCheckin;

            if (!isNaN(codigoCheckin)) {
                const checkin = new Checkin(0);
                checkin.consultar(codigoCheckin).then((dadosCheckin) => {
                    resposta.status(200).json({
                        "status": true,
                        "dadosCheckin": dadosCheckin
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar o check-in: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um código de check-in válido!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const hospedeCodigo = dados.hospede_codigo;
            const acomodacaoCodigo = dados.acomodacao_codigo;

            if (codigo && hospedeCodigo && acomodacaoCodigo) {
                // Atualizar o checkin
                const checkin = new Checkin(codigo, hospedeCodigo, acomodacaoCodigo);
                // Método assíncrono para atualizar o checkin no banco de dados
                checkin.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Check-in atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados do check-in conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou dados do check-in no formato JSON não fornecidos! Consulte a documentação da API."
            });
        }
    }
}