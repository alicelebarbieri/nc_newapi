const express = require("express");
const app = express();

const apiRouter    = require("./routes/api.router");
const topicsRouter = require("./routes/topics.router");
const articlesRouter = require("./routes/articles.router");
const commentsRouter = require("./routes/comments.router");

app.use(express.json());

// mount routers
app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/articles/:article_id/comments", commentsRouter);
app.use("/api/comments", commentsRouter);

// catch-all for any /api routes not handled above
app.use("/api", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Bad request" });
  }
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
