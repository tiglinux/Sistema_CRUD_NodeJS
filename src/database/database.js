const pg = require('pg');

//Cliente para conexão
const client = new pg.Client({
    user:'teste_backend',
    host:'ta-prod.cvpbcz94jacm.sa-east-1.rds.amazonaws.com',
    database:'teste_backend',
    port:5432,
    password:'N0d3JsExpr3$$'
});

module.exports = client; //Exportando cpg_hba.confliente de conexão