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

exports.selectAllArticles = (sort_by = "created_at", order = "desc") => {
  const validSortColumns = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "article_id",
    "article_img_url",
    "comment_count"
  ];
  const validOrder = ["asc", "desc"];

  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by column" });
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const queryStr = `
    SELECT 
      articles.author,
      title,
      articles.article_id,
      topic,
      articles.created_at,
      articles.votes,
      article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};
  `;

  return db.query(queryStr).then(({ rows }) => rows);
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