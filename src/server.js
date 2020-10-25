/*
    Code by : Tiago Ribeiro Santos
    email : tiago.programador@hotmail.com
**/

//Importa biblioteca express
const express = require('express');
//Iniciando app;
const app = express();
//Importando DB;
const database = require('./database/database');

//Aqui importa arquivo de rotas
app.use(require('../src/routes/routes'));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})) // converte um valor recebido por formulario para um objeto e só recebe dados simples


//Conectando DB
database.connect((err) => {
    if (err) {
        return console.log(err);
    }
});



app.listen(3001); // localhost:3001
















/*
//Query Select tabela para apresentar
db.query('SELECT * FROM veiculos', (err, res) => {
    console.log(err, res);
    db.end();
});



 */
