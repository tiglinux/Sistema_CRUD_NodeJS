
const {  response } = require("express");
const client = require("../database/database");


//Get Tabela Alunos
const getAlunos = async (req, res) => {
    const response = await client.query("SELECT * FROM alunos"); //Seleciona todos os campos
    res.status(200).json(response); //Aqui retorno os campos;
}

//Aqui eu insiro aluno
const createAlunos = async (req, res) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let categoria = req.body.categoria;

    const response = await client.query('INSERT INTO alunos (cpf,nome,categoria) VALUES ($1,$2,$3)', cpf,nome,categoria);

    console.log(response);
    res.json({
        message: 'Aluno adicionado com sucesso!',
        body: {
            aluno: {
                cpf, nome, categoria
            }
        }
    })
};



module.exports = {
    getAlunos,
    createAlunos
}