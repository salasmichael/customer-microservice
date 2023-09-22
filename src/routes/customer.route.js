const express = require('express');
const customerController = require("../controllers/customer.controller");

const app = express();

app.get("/customers",customerController.getAll);
app.get("/search/:query",customerController.search);
app.get("/customers/:id",customerController.getOne);
app.post("/create",customerController.save);
app.put("/update/:id",customerController.update);
app.delete("/delete/:id",customerController.delete);

module.exports = app;
