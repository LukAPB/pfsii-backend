import { Router } from "express";
import HospedeCTRL from "../Controle/hospedeCtrl.js";

const rotaHospede = new Router();
const hospedeCTRL = new HospedeCTRL();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado hospede

rotaHospede.post('/', hospedeCTRL.gravar)
.put('/',hospedeCTRL.atualizar)
.delete('/',hospedeCTRL.excluir)
.get('/', hospedeCTRL.consultar)
.get('/:termo', hospedeCTRL.consultar);

export default rotaHospede;