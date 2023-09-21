require("dotenv").config();
const mssql = require('mssql');
const dbConfig = require('../config/dbconfig');
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.getAll = async(req, res) => {

    try {

        const pool = await mssql.connect(dbConfig);
        const request = pool.request();
    
        request.input('Operation', mssql.NVarChar(30), 'getIdentificationType');
        const result = await request.execute('sp_Customers_CRUD');

        res
        .status(200)
        .send(successResponseFormat(result.recordset));
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat(`Erro: ${error}`));
    }
}


 
  