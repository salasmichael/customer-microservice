const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", require("./src/routes/customer.route"));

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
