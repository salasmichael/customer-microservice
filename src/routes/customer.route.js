const express = require('express');
const customerController = require("../controllers/customer.controller");
const app = express();

app.post("/create",customerController.save);

module.exports = app;
