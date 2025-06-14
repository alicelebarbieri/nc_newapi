const { checkArticleExists, selectCommentsByArticleId, insertComment, deleteCommentById, updateCommentVotesById } = require("../models/comments.model");

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

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) return res.status(400).send({ msg: "Bad request" });

  insertComment(article_id, username, body)
    .then((comment) => res.status(201).send({ comment }))
    .catch((err) => {
      if (err.code === "23503") return res.status(404).send({ msg: "Article or user not found" });
      next(err);
    });
};

exports.removeCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  if (isNaN(comment_id)) return res.status(400).send({ msg: "Bad request" });

  deleteCommentById(comment_id)
    .then(() => res.status(204).send())
    .catch((err) => {
      if (err.status) return res.status(err.status).send({ msg: err.msg });
      next(err);
    });
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateCommentVotesById(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};