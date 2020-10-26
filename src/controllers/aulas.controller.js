/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");



//Get Tabela Aulas
const getAulasAll = async(req, res) => {
    const response = await db.query("SELECT * FROM aulas"); //Seleciona todos os campos
    res.status(200).json(response.rows); //Aqui retorna as linhas
};

/* //Get Aulas por id
const getAulaById = async(req, res) => {
    const aulaId = parseInt(req.params.alunos_id);
    const response = await db.query("SELECT * from aulas WHERE id = $1", [aulaId]);
    res.status(200).json(response);
} */


//aceertar detalhe
const createAulas = async(req, res) => {
    const data_hora = req.body.data_hora;

    // hard to read
    let timestamp = Math.floor(+new Date() / 1000);

    console.log(timestamp);


    /* //Uma aula para ser agendada deve atender os seguintes requisitos: 
    const responseVeiculos = await db.query("SELECT * FROM veiculos", (err, res) => {
        registrosVeiculos = res.rowCount;
    });

    const responseAlunos = await db.query("SELECT * FROM alunos", (err, res) => {
        registrosAlunos = res.rowCount;
    });

    const responseInstrutores = await db.query("SELECT * FROM instrutores", (err, res) => {
        registrosInstrutores = res.rowCount;

    }); */


    /* if (registrosVeiculos > 0 && registrosAlunos > 0 && registrosInstrutores > 0) { */
    const {
        rows,
    } = await db.query(
        "INSERT INTO aulas(data_hora,presente)  VALUES ($1, $2)", [data_hora, presente]
    );
    /*   } */

};



const deleteAulasById = async(req, res) => {
    const alunoId = parseInt(req.params.alunos_id); // Aulas id é convertido para inteiro.

    await db.query('DELETE FROM aulas WHERE alunos_id = $1', [alunoId]);

    res.status(200).send({ message: 'Aula deletada com sucesso!', alunoId })
};

//Exporta para o resto do programa
module.exports = {
    getAulasAll,
    createAulas,
    deleteAulasById,
};