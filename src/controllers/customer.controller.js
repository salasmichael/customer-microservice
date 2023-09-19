require("dotenv").config();
const mssql = require('mssql');
const dbConfig = require('../config/dbconfig');
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.getAll = async(req, res) => {

    try {

        const pool = await mssql.connect(dbConfig);
        const request = pool.request();
    
        request.input('Operation', mssql.NVarChar(10), 'SELECTALL');
        const result = await request.execute('sp_Customers_CRUD');

        res
        .status(200)
        .send(successResponseFormat(result.recordset[0]));
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }
}

exports.save = async (req, res) => {
    
    try {

      const { identificationTypeID, identificationNumber,name,gender,imageURL } = req.body;
  
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
  
      // Definir los parámetros del procedimiento almacenado
      const operation = 'INSERT';
      request.input('Operation', mssql.NVarChar(10), operation);
      request.input('IdentificationTypeID', mssql.Int, identificationTypeID);
      request.input('IdentificationNumber', mssql.NVarChar(50), identificationNumber);
      request.input('Name', mssql.NVarChar(50), name);
      request.input('Gender', mssql.NVarChar(10), gender);
      request.input('ImageURL', mssql.NVarChar(255), imageURL);
  
      await request.execute('sp_Customers_CRUD');
      
      res
      .status(200)
      .send(successResponseFormat('Cliente insertado'));

    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };

  exports.update = async (req, res) => {
   
    try {
        const { customerID, identificationTypeID, identificationNumber,name,gender,imageURL } = req.body;
        
        const pool = await mssql.connect(dbConfig);
        const request = pool.request();

        request.input('Operation', mssql.NVarChar(10), 'UPDATE');
        request.input('CustomerID', mssql.Int, customerID);
        request.input('IdentificationTypeID', mssql.Int, identificationTypeID);
        request.input('IdentificationNumber', mssql.NVarChar(50), identificationNumber);
        request.input('Name', mssql.NVarChar(50), name);
        request.input('Gender', mssql.NVarChar(10), gender);
        request.input('ImageURL', mssql.NVarChar(255), imageURL);

        await request.execute('sp_Customers_CRUD');
        console.log('Cliente actualizado:', result.recordset[0]);
        
        res
        .status(200)
        .send(successResponseFormat(result.recordset[0]));
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }

  }

  exports.delete = async (req, res) => {
   
    try {

        const { customerID } = req.body;
  
        const pool = await mssql.connect(dbConfig);
        const request = pool.request();

        request.input('Operation', mssql.NVarChar(10), 'DELETE');
        request.input('CustomerID', mssql.Int, customerID);

        await request.execute('sp_Customers_CRUD');
        console.log('Cliente eliminado:', result.recordset[0]);
        
        res
        .status(200)
        .send(successResponseFormat(result.recordset[0]));
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }

  }

 
  