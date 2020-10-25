//Defino as rotas que vou utilizar;
const { Router } = require('express');

const router = Router();

//Importo function get do controller;
const { getAlunos , createAlunos} = require('../controllers/index.controller');

router.get('/alunos', getAlunos);
//Post para enviar dados e criar Alunos
router.post('/criarAlunos', createAlunos);



/* router.post('alunos') */

//Exportar rotas para todo.
module.exports = router;