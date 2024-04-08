import HospedeDAO from '../Persistencia/hospedeDAO.js';

export default class Hospede{

    #codigo;
    #cpf;  //# define que um atributo seja privado
    #nome;
    #telefone;


    //método construtor que define as informações necessárias para se criar um hospede
    constructor(codigo, cpf, nome, telefone){
        this.#codigo= codigo;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
   
        
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.codigo = novoCodigo;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "") //regra de negócio que impede que hospedes existam com nomes vazios
            this.#nome = novoNome;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }


    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "codigo"   : this.#codigo,
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "telefone" : this.#telefone
        }
    }

    async gravar(){
        const hospedeDAO = new HospedeDAO();
        await hospedeDAO.incluir(this);
    }

    async atualizar() {
        const hospedeBD = new HospedeDAO();
        await hospedeBD.alterar(this);
    }

    async removerDoBancoDados() {
        const hospedeBD = new HospedeDAO();
        await hospedeBD.excluir(this);
    }

    async consultar(termo){
        const hospedeBD = new HospedeDAO();
        const hospedes = await hospedeBD.consultar(termo);
        return hospedes;
    }

 
}