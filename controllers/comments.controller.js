const { checkArticleExists, selectCommentsByArticleId } = require("../models/comments.model");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  if (isNaN(article_id)) return res.status(400).send({ msg: "Bad request" });

  checkArticleExists(article_id)
    .then(() => selectCommentsByArticleId(article_id))
    .then((comments) => res.status(200).send({ comments }))
    .catch((err) => {
      if (err.status) return res.status(err.status).send({ msg: err.msg });
      next(err);
    });
};
