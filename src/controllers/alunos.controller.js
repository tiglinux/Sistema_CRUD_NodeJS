/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");

//Get Tabela Alunos
const getAlunosAll = async(req, res) => {
    const response = await db.query("SELECT * FROM alunos"); //Seleciona todos os campos
    res.status(200).json(response.rows); //Aqui retorna as linhas
};

//Get Aluno por id
const getAlunoById = async(req, res) => {
    const alunoId = parseInt(req.params.id);
    const response = await db.query("SELECT * from alunos WHERE id = $1", [alunoId]);
    res.status(200).json(response.rows);
};
//Aqui eu insiro aluno
const createAlunos = async(req, res) => {
    const cpf = req.body.cpf; // ok
    const cpfConvertidoString = cpf.toString();
    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //


    if (
        cpfConvertidoString.length == 14 &&
        nome.length > 0 &&
        nome.length <= 10 &&
        categoria.length > 0 &&
        categoria.length <= 2
    ) {
        //Linhas Criadas com sucesso
        const {
            rows,
        } = await db.query(
            "INSERT INTO alunos(cpf,nome,categoria)  VALUES ($1, $2, $3)", [cpf, nome, categoria]
        );

        res.status(201).json({
            success: true,
            message: "Aluno cadastrado com sucesso!",
            body: {
                aluno: {
                    cpf,
                    nome,
                    categoria,
                },
            },
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Inválido. Aluno não cadastrado.",
        });
    }
};

//FALTA ACERTAR
const updateAlunos = async(req, res) => {
    const alunoId = parseInt(req.params.id); // Aluno id é convertido para inteiro.

    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //
    const cpf = req.body.cpf; // ok

    await db.query("UPDATE alunos SET cpf = $1 , nome = $ 2 , categoria = $3 WHERE id = $4 ", [cpf, nome, categoria, alunoId]);

    res.status(200).send({ message: "Aluno alterado com sucesso" });
};

const deleteAlunosById = async(req, res) => {
    const alunoId = parseInt(req.params.id); // Aluno id é convertido para inteiro.

    await db.query('DELETE FROM alunos WHERE id = $1', [alunoId]);

    res.status(200).send({ message: 'Aluno deletado com sucesso!', alunoId })
};

//Exporta para o resto do programa
module.exports = {
    getAlunosAll,
    getAlunoById,
    createAlunos,
    updateAlunos,
    deleteAlunosById,
};