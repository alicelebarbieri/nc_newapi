const { selectArticleById } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  selectArticleById(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);  // this hands the {status,msg} object to your error handler
};
