const router = require('./routes');
const express = require('express')
const app = express();

app.use(express.json());
app.use("/items", router)

module.exports = app;