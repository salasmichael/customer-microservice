const express = require('express');
const customerController = require("../controllers/customer.controller");

const app = express();

app.get("/customers",customerController.getAll);
app.post("/create",customerController.save);
app.put("/update",customerController.update);
app.delete("/delete",customerController.delete);

module.exports = app;
