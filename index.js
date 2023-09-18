const express = require('express');
const bodyParser = require('body-parser');
const mssql = require('mssql');
const dbConfig = require('./src/config/dbconfig');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Conexión a la base de datos
mssql.connect(dbConfig, (err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

app.use("/api", require("./src/routes/customer.route"));

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
