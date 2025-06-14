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

exports.insertComment = (article_id, username, body) => {
  const queryStr = `
    INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return db.query(queryStr, [article_id, username, body])
    .then(({ rows }) => rows[0]);
};

exports.deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return;
    });
};

exports.updateCommentVotesById = (comment_id, inc_votes) => {
  if (isNaN(comment_id) || typeof inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db.query(
    `UPDATE comments
     SET votes = votes + $1
     WHERE comment_id = $2
     RETURNING *;`,
    [inc_votes, comment_id]
  ).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Comment not found" });
    }
    return rows[0];
  });
};