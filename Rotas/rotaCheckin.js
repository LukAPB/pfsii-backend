import { Router } from "express";
import CheckinCtrl from "../Controle/checkinCtrl.js";

const rotaCheckin = new Router();
const checkinCtrl = new CheckinCtrl();

rotaCheckin
    .get('/:termo', checkinCtrl.consultar)
    .get('/', checkinCtrl.consultar)
    .post('/', checkinCtrl.gravar)
    .patch('/', checkinCtrl.atualizar)
//.put('/', checkinCtrl.atualizar)
//.delete('/', checkinCtrl.excluir);

export default rotaCheckin;