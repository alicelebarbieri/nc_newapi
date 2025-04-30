const express = require("express");
const app = express();

app.use(express.json());

const endpoints = require("./endpoints.json");

app.get("/api", (req, res) => {
  res.status(200).send(endpoints);
});

module.exports = app;