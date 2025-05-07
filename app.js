const express = require("express");
const app = express();
app.use(express.json());

const apiRouter = require("./routes/api.router");
const topicsRouter = require("./routes/topics.router");

app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);

module.exports = app;
