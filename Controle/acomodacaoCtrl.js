import Acomodacao from "../Modelo/acomodacao.js";

export default class AcomodacaoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const categoria = dados.categoria;

            
            if (descricao && precoCusto > 0 && precoVenda > 0 && dataValidade
                && qtdEstoque >= 0 && categoria) {
                const acomodacao = new Acomodacao(0, descricao, precoCusto,
                    precoVenda, dataValidade, qtdEstoque, categoria
                );
                //resolver a promise
                acomodacao.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": acomodacao.codigo,
                        "mensagem": "Acomodacao incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o acomodacao:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do acomodacao segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um acomodacao!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const categoria = dados.categoria;
            if (codigo && descricao && precoCusto > 0 && precoVenda > 0 && dataValidade
                && qtdEstoque >= 0 && categoria) {
                const acomodacao = new Acomodacao(codigo, descricao, precoCusto,
                    precoVenda, dataValidade, qtdEstoque, categoria);
                //resolver a promise
                acomodacao.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Acomodacao atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o acomodacao:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do acomodacao segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um acomodacao!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const acomodacao = new Acomodacao(codigo);
                //resolver a promise
                acomodacao.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Acomodacao excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o acomodacao:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do acomodacao!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um acomodacao!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const acomodacao = new Acomodacao();
            acomodacao.consultar(termo).then((listaAcomodacaos) => {
                resposta.json(
                    {
                        status: true,
                        listaAcomodacaos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os acomodacaos: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar acomodacaos!"
            });
        }
    }
}