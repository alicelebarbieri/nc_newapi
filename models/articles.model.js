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