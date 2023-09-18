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

// Rutas de tu microservicio
app.get('/clientes', (req, res) => {
  // Implementa aquí la lógica para obtener clientes desde la base de datos y responder con ellos
});

app.post('/clientes', (req, res) => {
  // Implementa aquí la lógica para crear un nuevo cliente en la base de datos
});

app.put('/clientes/:id', (req, res) => {
  // Implementa aquí la lógica para actualizar un cliente en la base de datos
});

app.delete('/clientes/:id', (req, res) => {
  // Implementa aquí la lógica para eliminar un cliente de la base de datos
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
