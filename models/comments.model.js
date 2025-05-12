const db = require("../db/connection");

exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT 1 FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rowCount }) => {
      if (rowCount === 0) return Promise.reject({ status: 404, msg: "Article not found" });
    });
};

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
       FROM comments
       WHERE article_id = $1
       ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => rows);
};
