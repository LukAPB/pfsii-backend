import HospedeDAO from '../Persistencia/hospedeDAO.js';

export default class Hospede{

    #codigo;
    #cpf;  //# define que um atributo seja privado
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;

    //método construtor que define as informações necessárias para se criar um hospede
    constructor(codigo, cpf, nome, endereco, bairro, cidade, uf, telefone, email){
        this.#codigo= codigo;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
        
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

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    get bairro(){
        return this.#bairro;    
    }
    
    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }
    
    set uf(novaUf){
        this.#uf=novaUf;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "codigo"   : this.#codigo,
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "endereco" : this.#endereco,
            "bairro"   : this.#bairro,
            "cidade"   : this.#cidade,
            "uf"       : this.#uf,
            "telefone" : this.#telefone,
            "email"    : this.#email
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

    async consultarCPF(cpf){
        const hospedeBD = new HospedeDAO();
        const hospedes = await hospedeBD.consultarCPF(cpf);
        return hospedes;
    }
}