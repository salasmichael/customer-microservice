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
        .send(successResponseFormat(result.recordset));
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('Error al cargar los clientes'));
    }
}

exports.getOne = async(req, res) => {

  try {
      const { id } = req.params;
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
  
      request.input('Operation', mssql.NVarChar(10), 'SELECT');
      request.input('CustomerID', mssql.Int, id);
      const result = await request.execute('sp_Customers_CRUD');

      res
      .status(200)
      .send(successResponseFormat(result.recordset));

      
  } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('Error al cargar el cliente'));
  }
}

exports.search = async(req, res) => {

  try {
      const { query } = req.params;
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
  
      request.input('Operation', mssql.NVarChar(10), 'SEARCH');
      request.input('Search', mssql.NVarChar(50), query);
      const result = await request.execute('sp_Customers_CRUD');

      res
      .status(200)
      .send(successResponseFormat(result.recordset));

      
  } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('Error al cargar el cliente'));
  }
}

exports.save = async (req, res) => {
    
    try {

      const { identificationTypeID, identificationNumber,name,gender } = req.body;
  
      const pool = await mssql.connect(dbConfig);
      const request = pool.request();
  
      request.input('Operation', mssql.NVarChar(10), 'INSERT');
      request.input('IdentificationTypeID', mssql.Int, identificationTypeID);
      request.input('IdentificationNumber', mssql.NVarChar(50), identificationNumber);
      request.input('Name', mssql.NVarChar(50), name);
      request.input('Gender', mssql.NVarChar(10), gender);
  
      await request.execute('sp_Customers_CRUD');
      
      res
      .status(200)
      .send(successResponseFormat('Cliente creado con exito!'));

    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat(error?.originalError?.info?.message));
    }
  };

  exports.update = async (req, res) => {
   
    try {
        const { id } = req.params;
        const { identificationTypeID, identificationNumber,name,gender } = req.body;
        
        const pool = await mssql.connect(dbConfig);
        const request = pool.request();

        request.input('Operation', mssql.NVarChar(10), 'UPDATE');
        request.input('CustomerID', mssql.Int, id);
        request.input('IdentificationTypeID', mssql.Int, identificationTypeID);
        request.input('IdentificationNumber', mssql.NVarChar(50), identificationNumber);
        request.input('Name', mssql.NVarChar(50), name);
        request.input('Gender', mssql.NVarChar(10), gender);

        await request.execute('sp_Customers_CRUD');
        
        res
        .status(200)
        .send(successResponseFormat('Cliente actualizado con exito!'));
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('Error al actualizar el cliente'));
    }

  }

  exports.delete = async (req, res) => {
   
    try {

        const { id } = req.params;
  
        const pool = await mssql.connect(dbConfig);
        const request = pool.request();

        request.input('Operation', mssql.NVarChar(10), 'DELETE');
        request.input('CustomerID', mssql.Int, id);

        await request.execute('sp_Customers_CRUD');
        
        res
        .status(200)
        .send(successResponseFormat('Cliente eliminado'));
  
        
    } catch (error) {
        console.error(error);
        res.status(500).send(errorResponseFormat('An error occurred'));
    }

  }

 
  