import express from 'express';
import cors from 'cors';
import rotaAcomodacao from './Rotas/rotaAcomodacao.js';
import rotaCheckin from './Rotas/rotaCheckin.js';
import rotaHospede from './Rotas/rotaHospede.js';

const host = 'localhost';
const porta = 4000;

const app = express();

// Configurações CORS mais abrangentes
app.use(cors({
  origin: '*', // Permitir apenas solicitações deste endereço
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir os métodos necessários
  allowedHeaders: 'Content-Type,Authorization', // Permitir os cabeçalhos necessários
  credentials: true // Permitir credenciais (cookies, por exemplo)
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas do seu aplicativo
app.use('/hospede', rotaHospede);
app.use('/acomodacao', rotaAcomodacao);
app.use('/checkin', rotaCheckin);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
