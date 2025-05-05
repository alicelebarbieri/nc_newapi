const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  // 1) Handle completely invalid IDs
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url
       FROM articles
       WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        // 2) If no such article, reject with 404
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};
