import AcomodacaoDAO from "../Persistencia/acomodacaoDAO.js";

export default class Acomodacao {
    #codigo;
    #tipo;
    #descricao;
    #capacidade;

    constructor(codigo = 0, tipo = "", descricao = "", capacidade = 0) {
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#descricao = descricao;
        this.#capacidade = capacidade;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(novoTipo) {
        this.#tipo = novoTipo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDesc) {
        this.#descricao = novaDesc;
    }

    get capacidade() {
        return this.#capacidade;
    }

    set capacidade(novaCapacidade) {
        this.#capacidade = novaCapacidade;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            tipo: this.#tipo,
            descricao: this.#descricao,
            capacidade: this.#capacidade
        };
    }

    async gravar() {
        const acomodacaoDAO = new AcomodacaoDAO();
        await acomodacaoDAO.gravar(this);
    }

    async excluir() {
        const acomodacaoDAO = new AcomodacaoDAO();
        await acomodacaoDAO.excluir(this);
    }

    async alterar() {
        const acomodacaoDAO = new AcomodacaoDAO();
        await acomodacaoDAO.atualizar(this);
    }

    async consultar(termo) {
        const acomodacaoDAO = new AcomodacaoDAO();
        return await acomodacaoDAO.consultar(termo);
    }
}