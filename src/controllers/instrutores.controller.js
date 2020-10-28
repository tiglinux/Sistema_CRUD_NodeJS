/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");

//Regex para formatar Cpf com Máscara
const formataCPF = (cpf) => { // cpf -> string
    //retira os caracteres indesejados
    cpf = cpf.replace(/[^\d]/g, "");

    //realizar a formatação
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}


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
    const cpfMascara = formataCPF(cpfConvertidoString);
    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //

    let categoriaArray = ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];

    if (
        cpfMascara.length == 14 &&
        nome.length > 0 &&
        nome.length <= 10 &&
        categoriaArray.includes(categoria)
    ) {
        //Linhas Criadas com sucesso caso passe na restrição 
        const { rows } = await db.query(
            "INSERT INTO instrutores(cpf,nome,categoria)  VALUES ($1, $2, $3)", [cpfMascara, nome, categoria]
        );

        res.status(201).json({
            success: true,
            message: "Instrutor cadastrado com sucesso!",
            body: {
                instrutor: {
                    cpfMascara,
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

const updateInstrutores = async(req, res) => {
    const instrutorId = parseInt(req.params.id); // Instrutor id é convertido para inteiro.

    const cpf = req.body.cpf;
    const cpfConvertidoString = cpf.toString();
    const cpfMascara = formataCPF(cpfConvertidoString);
    const nome = req.body.nome;
    const categoria = req.body.categoria;

    let categoriaArray = ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];

    if (
        cpfMascara.length == 14 &&
        nome.length > 0 &&
        nome.length <= 10 && categoriaArray.includes(categoria)
    ) {
        await db.query("UPDATE instrutores SET cpf = $1 , nome = $2 , categoria = $3 WHERE id = $4 ", [cpfMascara, nome, categoria, instrutorId]);
        res.status(200).send({ message: "Instrutor alterado com sucesso" });
    } else {
        res.status(400).json({
            success: false,
            message: "Inválido. Instrutor não Alterado.Dados Inválidos!",
        });
    }
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