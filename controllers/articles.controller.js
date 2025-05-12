const { selectArticleById } = require("../models/articles.model");

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