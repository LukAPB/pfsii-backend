import CheckinDAO from "../Persistencia/checkinDAO.js";
export default class Checkin {
    #codigo;
    #hospede;
    #acomodacao
    #data;
    #total;


    constructor(codigo, hospede, data, total, acomodacao) {
        this.#codigo = codigo;
        this.#hospede = hospede;
        this.#acomodacao = acomodacao;
        this.#data = data;
        this.#total = total;

    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Código do Hospede
    get hospede() {
        return this.#hospede;
    }

    set hospede(novohospede) {
        this.#hospede = novohospede;

    }

    get acomodacao() {
        return this.#acomodacao;
    }

    set acomodacao(novoacomodacao) {
        this.#acomodacao = novoacomodacao;

    }


    // Data
    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    // Total do Checkin
    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'hospede': this.#hospede,
            'data': this.#data,
            'total': this.#total,
            'acomodacao': this.#acomodacao

        };
    }

    async gravar() {
        const checkinDAO = new CheckinDAO();
        console.log(this)
        this.codigo = await checkinDAO.gravar(this);
        console.log("Ajuda2", this.codigo)
    }

    async atualizar() {
        //const checkinDAO = new CheckinDAO();
        //await checkinDAO.alterar(this);
    }

    async apagar() {
        //const checkinDAO = new CheckinDAO();
        //await checkinDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const checkinDAO = new CheckinDAO();
        const listaCheckins = await checkinDAO.consultar(termoBusca);
        return listaCheckins;
    }

}
