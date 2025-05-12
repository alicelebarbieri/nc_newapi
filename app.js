const express = require("express");
const app = express();

const apiRouter    = require("./routes/api.router");
const topicsRouter = require("./routes/topics.router");
const articlesRouter = require("./routes/articles.router");

app.use(express.json());

// mount your routers
app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);

// catch-all for any /api routes not handled above
app.use("/api", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
