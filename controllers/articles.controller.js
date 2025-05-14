const { selectArticleById, selectAllArticles, updateArticleVotes  } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  // 400 if not a number
  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  selectArticleById(article_id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ msg: "Article not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;

  selectAllArticles(sort_by, order)
    .then((articles) => res.status(200).send({ articles }))
    .catch((err) => {
      if (err.status) return res.status(err.status).send({ msg: err.msg });
      next(err);
    });
};


exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Bad request" });
  }

  if (typeof inc_votes !== "number") {
    return res.status(400).send({ msg: "Missing or invalid inc_votes" });
  }

  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      if (err.status) return res.status(err.status).send({ msg: err.msg });
      next(err);
    });
};