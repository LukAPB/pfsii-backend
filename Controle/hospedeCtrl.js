import Hospede from '../Modelo/hospede.js';


export default class HospedeCTRL{

  
    gravar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                //gravar esse hospede
                const hospede = new Hospede(cpf, nome, endereco, bairro, cidade,
                                            uf,telefone,email);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um hospede no banco de dados
                hospede.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Hospede gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um hospede conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hospede no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    //requisição HTTP do tipo PUT
    atualizar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                //gravar esse hospede
                const hospede = new Hospede(cpf, nome, endereco, bairro, cidade,
                                            uf,telefone,email);
                //método assíncrono gravar que instancia a camada de persistência e
                //grava um hospede no banco de dados
                hospede.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Hospede atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados de um hospede conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hospede no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                //gravar esse hospede
                const hospede = new Hospede(cpf);
                //método assíncrono removerDoBanco que instancia a camada de persistência e
                //grava um hospede no banco de dados
                hospede.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Hospede excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });                                   
            }
            else
            {
               resposta.status(400).json({
                    status:false,
                    mensagem:"Informe cpf do hospede conforme documentação da API!"
               });     
            }
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou hospede no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        
        if(requisicao.method === "GET"){
            const hospede = new Hospede();
            //método assíncrono que recupera os hospedes do banco dados
            hospede.consultar('').then((hospedes)=>{
                    resposta.status(200).json(hospedes);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }

    //alguém poderá fazer a seguinte requisição:
    //GET http://localhost:3000/hospedes/111.111.111-11
    consultarPeloCPF(requisicao, resposta){
        resposta.type("application/json");
        
        const cpf = requisicao.params['cpf'];
        
        if(requisicao.method === "GET"){
            const hospede = new Hospede();
            //método assíncrono que recupera os hospedes do banco dados
            hospede.consultarCPF(cpf).then((hospede)=>{
                    resposta.status(200).json(hospede);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });                                   
        }
        else{
            //código 400 o erro é do usuário que fez a requisição
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido! Consulte a documentação da API"
            });
        }
    }
}