/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");

//Get Tabela Veiculos
const getVeiculosAll = async(req, res) => {
    const response = await db.query("SELECT * FROM veiculos"); //Seleciona todos os campos
    res.status(200).json(response.rows); //Aqui retorna as linhas
};

//Get Veiculo por id
const getVeiculoById = async(req, res) => {
    const veiculoId = parseInt(req.params.id);
    const response = await db.query("SELECT * from veiculos WHERE id = $1", [veiculoId]);
    res.status(200).json(response.rows);
};

const createVeiculo = async(req, res) => {
    const placa = req.body.placa;
    let placaMaisculo = placa.toUpperCase();
    const descricao = req.body.descricao;
    const categoria = req.body.categoria;

    console.log(descricao);
    console.log(placaMaisculo);

    if (categoria.length > 0 && categoria.length < 2 && (descricao.length > 0 && descricao.length <= 10) && placaMaisculo.length == 7) {
        //Linhas Criadas com sucesso
        const {
            rows,
        } = await db.query(
            "INSERT INTO veiculos(placa,descricao,categoria)  VALUES ($1, $2, $3)", [placaMaisculo, descricao, categoria]
        );

        res.status(201).json({
            success: true,
            message: "Veículo cadastrado com sucesso!",
            body: {
                veiculo: {
                    placa,
                    descricao,
                    categoria,
                },
            },
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Inválido. Veiculo não cadastrado.",
        });
    }
};

//FALTA ACERTAR
const updateVeiculo = async(req, res) => {


    const nome = req.body.nome; // ok
    const categoria = req.body.categoria; //
    const cpf = req.body.cpf; // ok

    await db.query("UPDATE veiculos SET cpf = $1 , nome = $ 2 , categoria = $3 WHERE id = $4 ", [cpf, nome, categoria, alunoId]);

    res.status(200).send({ message: "Veiculo alterado com sucesso" });
};

const deleteVeiculosById = async(req, res) => {
    const veiculoId = parseInt(req.params.id); // Veiculo id é convertido para inteiro.

    await db.query('DELETE FROM veiculos WHERE id = $1', [veiculoId]);

    res.status(200).send({ message: 'Veiculo deletado com sucesso!', instrutorId })
};

//Exporta para o resto do programa
module.exports = {
    getVeiculosAll,
    getVeiculoById,
    createVeiculo,
    updateVeiculo,
    deleteVeiculosById,
};