const express = require('express');
const identificationTypeController = require("../controllers/identificationType.controller");

const app = express();

app.get("/identificationType",identificationTypeController.getAll);

module.exports = app;
