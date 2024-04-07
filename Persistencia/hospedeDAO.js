import Hospede from '../Modelo/hospede.js';
import conectar from "./conexao.js";

export default class HospedeDAO{

    async incluir(hospede){

        if (hospede instanceof Hospede){
            const conexao = await conectar();
            const sql="INSERT INTO hospede(cpf,nome,endereco,bairro,cidade, \
                                           estado,telefone, email) \
                                           VALUES(?,?,?,?,?,?,?,?)";
            const valores = [hospede.cpf,hospede.nome,hospede.endereco, 
                             hospede.bairro, hospede.cidade, hospede.uf,
                             hospede.telefone, hospede.email];                                        
            await conexao.query(sql,valores);
        }

    }

    async alterar(hospede){
        
        if (hospede instanceof Hospede){
            const conexao = await conectar();
            const sql="UPDATE hospede SET nome=?, endereco = ?,bairro = ?, \
                                      cidade = ?, estado = ?,telefone = ?, email = ? \
                       WHERE cpf=?";
            const valores = [hospede.nome,hospede.endereco, 
                             hospede.bairro, hospede.cidade, hospede.uf,
                             hospede.telefone, hospede.email, hospede.cpf];                                        
            await conexao.query(sql,valores);
        }
    }

    async excluir(hospede){

        if (hospede instanceof Hospede){
            const conexao = await conectar();
            const sql="DELETE FROM hospede WHERE cpf=?";
            const valores = [hospede.cpf];                                        
            await conexao.query(sql,valores);
        } 

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM hospede WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for(const row of rows){
            const hospede = new Hospede(row['codigo'],row['cpf'],row['nome'],
            row['endereco'],row['bairro'],row['cidade'],row['estado'], 
            row['telefone'], row['email']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }

    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = "SELECT * FROM hospede WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql, valores);
        const listaHospedes = [];
        for(const row of rows){
            const hospede = new Hospede(row['cpf'],row['nome'],
            row['endereco'],row['bairro'],row['cidade'],row['estado'], 
            row['telefone'], row['email']);
            listaHospedes.push(hospede);
        }
        return listaHospedes;
    }
}