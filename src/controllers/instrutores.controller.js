/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");

//Get Tabela Instrutoress
const getInstrutoresAll = async(req, res) => {
    const response = await db.query("SELECT * FROM instrutores"); //Seleciona todos os campos
    res.status(200).json(response.rows); //Aqui retorna as linhas
};

//Get Instrutor por id
const getInstrutorById = async(req, res) => {
    const instrutorId = parseInt(req.params.id);
    const response = await db.query("SELECT * from instrutores WHERE id = $1", [instrutorId]);
    res.status(200).json(response.rows);
};
//Post Instrutor
const createInstrutor = async(req, res) => {
    const cpf = req.body.cpf; // ok
    const cpfConvertidoString = cpf.toString();
    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //

    console.log(nome.length);
    console.log(cpfConvertidoString.length);
    console.log(categoria.length);

    if (
        cpfConvertidoString.length == 14 &&
        nome.length > 0 &&
        nome.length <= 10 &&
        categoria.length > 0 &&
        categoria.length <= 2
    ) {
        //Linhas Criadas com sucesso
        const { rows } = await db.query(
            "INSERT INTO instrutores(cpf,nome,categoria)  VALUES ($1, $2, $3)", [cpf, nome, categoria]
        );

        res.status(201).json({
            success: true,
            message: "Instrutor cadastrado com sucesso!",
            body: {
                instrutor: {
                    cpf,
                    nome,
                    categoria,
                },
            },
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Inválido. Instrutor não cadastrado.",
        });
    }
};

//FALTA ACERTAR
const updateInstrutores = async(req, res) => {
    const instrutorId = parseInt(req.params.id); // Instrutor id é convertido para inteiro.

    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //
    const cpf = req.body.cpf; // ok

    await db.query("UPDATE instrutores SET cpf = $1 , nome = $ 2 , categoria = $3 WHERE id = $4 ", [cpf, nome, categoria, alunoId]);

    res.status(200).send({ message: "Instrutor alterado com sucesso" });
};

const deleteInstrutoressById = async(req, res) => {
    const instrutorId = parseInt(req.params.id); // Instrutor id é convertido para inteiro.

    await db.query('DELETE FROM instrutores WHERE id = $1', [instrutorId]);

    res.status(200).send({ message: 'Instrutor deletado com sucesso!', instrutorId })
};

//Exporta para o resto do programa
module.exports = {
    getInstrutoresAll,
    getInstrutorById,
    createInstrutor,
    updateInstrutores,
    deleteInstrutoressById,
};