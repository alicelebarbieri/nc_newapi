const express = require("express");
const app = express(); 

const apiRouter = require("./routes/api.router");
const articlesRouter = require("./routes/articles.router");

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/articles", articlesRouter); 

// ─── ERROR HANDLER ───────────────────────────────────────────
app.use((err, req, res, next) => {
    // custom errors we rejected with
    if (err.status && err.msg) {
      return res.status(err.status).send({ msg: err.msg });
    }
    // catch Postgres invalid-text‐rep error if you weren't pre‐validating
    if (err.code === "22P02") {
      return res.status(400).send({ msg: "Bad request" });
    }
    // fallback
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  });

module.exports = app;
