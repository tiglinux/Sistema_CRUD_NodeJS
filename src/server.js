/*
    Code by : Tiago Ribeiro Santos
    email : tiago.programador@hotmail.com

    Date : 25/10/2020
**/
const cors = require('cors');
//Importa biblioteca express
const express = require('express');
//Iniciando app;
const app = express();
//Permite que envio dados para a minha app para o formato json
app.use(express.json());
//Importando DB;
const database = require('./database/database');

//Aqui importa arquivo de rotas e todas as rotas criadas
app.use(require('../src/routes/routes'));

app.use(cors());

app.use(express.urlencoded({ extended: false })) // converte um valor recebido por formulario para um objeto e só recebe dados simples


//Conectando DB
database.connect((err) => {
    if (err) {
        return console.log(err);
    }
});



app.listen(3001); // localhost:3001