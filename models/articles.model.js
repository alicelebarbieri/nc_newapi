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

exports.selectAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortColumns = [
    "article_id", "title", "topic", "author", "created_at", "votes", "comment_count"
  ];
  const validOrders = ["asc", "desc"];

  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by column" });
  }

  if (!validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order value" });
  }

  const queryParams = [];
  let queryStr = `
    SELECT 
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
  `;

  if (topic) {
    queryParams.push(topic);
    queryStr += `WHERE articles.topic = $1\n`;
  }

  queryStr += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};
  `;

  return db.query(queryStr, queryParams).then(({ rows }) => rows);
};

exports.checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Topic not found" });
      }
    });
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