const express = require('express');
const apiRouter = require('./routes/api.router');
const topicsRouter = require('./routes/topics.router');
const articlesRouter = require('./routes/articles.router');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/articles', articlesRouter);

app.use((req, res) => {
  res.status(404).send({ msg: 'Route not found' });
});


app.use((err, req, res, next) => {
  if (err.status && err.msg) return res.status(err.status).send({ msg: err.msg });
  if (err.code === '22P02') return res.status(400).send({ msg: 'Bad request' });
  console.error(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
