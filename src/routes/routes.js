/*
    Code by  : Tiago Ribeiro Santos
    Email : tiago.programador@hotmail.com
    Github : www.github.com/tiglinux
**/

//Defino as rotas que vou utilizar;
const { Router } = require('express');

const router = Router();

//Importo function get do controller;
const { getAlunosAll, createAlunos, getAlunoById, updateAlunos, deleteAlunosById } = require('../controllers/alunos.controller');
const { getAulasAll, createAulas, updateAulas, deleteAulasById } = require('../controllers/aulas.controller');
const { getInstrutoresAll, getInstrutorById, createInstrutor, updateInstrutores, deleteInstrutoressById } = require('../controllers/instrutores.controller');
const { getVeiculosAll, getVeiculoById, createVeiculo, updateVeiculo, deleteVeiculosById } = require('../controllers/veiculos.controller');

/** ALUNOS */
//Mostra todos os Registros da Tabela Alunos 
router.get('/alunos', getAlunosAll);
//Get Aluno por Id
router.get('/alunos/:id', getAlunoById);
//Post para enviar dados e criar Alunos JSON
router.post('/alunos', createAlunos);
//Update atualiza Registros tabela Alunos
router.put('/alunos:id', updateAlunos);
//Deleta um registro da tabela
router.delete('/alunos/:id', deleteAlunosById)

/** INSTRUTORES */
//Mostra todos os Registros da Tabela Instrutores 
router.get('/instrutores', getInstrutoresAll);
//Get Aluno por Id
router.get('/instrutores/:id', getInstrutorById);
//Post para enviar dados e criar Alunos JSON
router.post('/instrutores', createInstrutor);
//Update atualiza Registros tabela Alunos
router.put('/instrutores:id', updateInstrutores);
//Deleta um registro da tabela
router.delete('/instrutores/:id', deleteInstrutoressById);

/** VEICULOS */
//Mostra todos os Registros da Tabela Veiculos 
router.get('/veiculos', getVeiculosAll);
//Get Aluno por Id
router.get('/veiculos/:id', getVeiculoById);
//Post para enviar dados e criar Alunos JSON
router.post('/veiculos', createVeiculo);
//Update atualiza Registros tabela Alunos
router.put('/veiculos:id', updateVeiculo);
//Deleta um registro da tabela
router.delete('/veiculos/:id', deleteVeiculosById);


/** AULAS */
//Mostra todos os Registros da Tabela Aulas 
router.get('/aulas', getAulasAll);
//Post para enviar dados e criar Aulas JSON
router.post('/aulas', createAulas);

//Deleta um registro da tabela
router.delete('/aulas/:id', deleteAulasById);


//Exportar rotas para todo.
module.exports = router;