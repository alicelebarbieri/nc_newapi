const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url
       FROM articles
       WHERE article_id = $1;`,
      [article_id]
    )
    .then(({ rows }) => rows[0]);
};

exports.selectAllArticles = () => {
    return db
      .query(
        `SELECT 
           a.author, 
           a.title, 
           a.article_id, 
           a.topic, 
           a.created_at, 
           a.votes, 
           a.article_img_url,
           COUNT(c.comment_id)::INT AS comment_count
         FROM articles a
         LEFT JOIN comments c
           ON a.article_id = c.article_id
         GROUP BY a.article_id
         ORDER BY a.created_at DESC;`
      )
      .then(({ rows }) => rows);
  };

  exports.updateArticleVotesById = (article_id, inc_votes) => {
    if (isNaN(article_id) || typeof inc_votes !== "number") {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
  
    return db
      .query(
        `UPDATE articles
         SET votes = votes + $1
         WHERE article_id = $2
         RETURNING *;`,
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Article not found" });
        }
        return rows[0];
      });
  };

  exports.updateArticleVotes = async (article_id, inc_votes) => {
    const { rows } = await db.query(
      `UPDATE articles
       SET votes = votes + $1
       WHERE article_id = $2
       RETURNING *;`,
      [inc_votes, article_id]
    );
  
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    }
  
    return rows[0];
  };