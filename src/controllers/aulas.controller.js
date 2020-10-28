/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com

    Github : www.github.com/tiglinux
**/

const db = require("../database/database");


//Get Tabela Aulas
const getAulasAll = async(req, res) => {
    const response = await db.query("SELECT * FROM aulas"); //Seleciona todos os campos
    res.status(200).json(response); //Aqui retorna as linhas
};

//Get Aulas por id
const getAulaById = async(req, res) => {
    const aulaId = parseInt(req.params.alunos_id);
    const response = await db.query("SELECT * from aulas WHERE id = $1", [aulaId]);
    res.status(200).json(response);
}


//aceertar detalhe
const createAulas = async(req, res) => {
    const placaVeiculo = req.body.veiculo;
    const categoriaVeiculoInstrutor = req.body.categoriaVeiculoInstrutor;
    const cpf_Aluno = req.body.aluno;
    const cpf_Instrutor = req.body.instrutor;
    const categoriaVeiculoAluno = req.body.categoriaVeiculoAluno; //Categoria que o Aluno quer fazer AULA
    const categoriaVerificaAluno = await db.query('SELECT categoria FROM veiculos WHERE placa = $1 ', [placaVeiculo]);
    const categoriaVerificaInstrutor = await db.query('SELECT categoria FROM instrutores');
    const categoriaVerificaInstrutorIndice = await categoriaVerificaInstrutor.rows[0].categoria;
    const dataAgendada = req.body.data_hora;

    let data_atual = Date.now();
    //Queries que verifica se os alunos,veiculo e instrutor estão cadastrados
    const responseVeiculo = await db.query('SELECT * FROM veiculos WHERE placa = $1', [placaVeiculo]);
    const responseAluno = await db.query('SELECT * FROM alunos WHERE  cpf = $1', [cpf_Aluno]);
    const responseInstrutor = await db.query('SELECT * FROM instrutores WHERE  cpf = $1', [cpf_Instrutor])


    //Verifica se estao cadastrados com o responses
    if (responseVeiculo && responseAluno && responseInstrutor) {
        let categoriaVerificaAlunoIndice = categoriaVerificaAluno.rows[0].categoria.toUpperCase(); // tem valor A
        if (categoriaVeiculoAluno == categoriaVerificaAlunoIndice) {
            if (categoriaVeiculoInstrutor == categoriaVerificaInstrutorIndice) {

                switch (categoriaVeiculoInstrutor) {
                    case 'A':
                        console.log('Instrutor só pode dar aula em veículo de categoria A');
                        break;
                    case 'C':
                        console.log('Instrutor só pode dar aula em veículo de categoria B ou C');
                        break;
                    case 'AC':
                        console.log('Instrutor só pode dar aula em A,B ou C');
                        break;
                    default:
                        res.status(400).json({
                            success: false,
                            message: "Instrutor só pode dar aulas em Categoria : A,C ou AC  e Categoria está Diferente dessas cadastradas!",
                        })
                }
            } else if (categoriaVeiculoInstrutor != categoriaVerificaInstrutorIndice) {
                res.status(400).json({
                    success: false,
                    message: "Inválido. Categoria do Veículo do Instrutor é diferente do que está cadastrada",
                });
            }
            if (dataAgendada >= data_atual) {
                await db.query("INSERT INTO aulas ");

            }

        }


    }



};


const updateAulas = async(req, res) => {

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
    getAulaById,
    updateAulas
};