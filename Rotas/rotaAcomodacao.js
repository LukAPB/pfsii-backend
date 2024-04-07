import { Router } from "express";
import AcomodacaoCtrl from "../Controle/acomodacaoCtrl.js";

const prodCtrl = new AcomodacaoCtrl();
const rotaAcomodacao = new Router();

rotaAcomodacao
.get('/', prodCtrl.consultar)
.get('/:termo', prodCtrl.consultar)
.post('/', prodCtrl.gravar)
.patch('/', prodCtrl.atualizar)
.put('/', prodCtrl.atualizar)
.delete('/', prodCtrl.excluir);

export default rotaAcomodacao;