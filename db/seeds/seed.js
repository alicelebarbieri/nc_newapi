const db = require("../connection");
const format = require("pg-format");

// Seed function: drop tables, create them, then insert data
const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    // 1) Drop tables in reverse-dependency order
    .query("DROP TABLE IF EXISTS comments;")
    .then(() => db.query("DROP TABLE IF EXISTS articles;"))
    .then(() => db.query("DROP TABLE IF EXISTS users;"))
    .then(() => db.query("DROP TABLE IF EXISTS topics;"))

    // 2) Create topics table
    .then(() =>
      db.query(`
        CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY,
          description VARCHAR NOT NULL,
          img_url VARCHAR(1000)
        );
      `)
    )

    // 3) Create users table
    .then(() =>
      db.query(`
        CREATE TABLE users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR(1000)
        );
      `)
    )

    // 4) Create articles table
    .then(() =>
      db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          topic VARCHAR REFERENCES topics(slug) NOT NULL,
          author VARCHAR REFERENCES users(username) NOT NULL,
          article_img_url VARCHAR(1000),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
    )

    // 5) Create comments table
    .then(() =>
      db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username) NOT NULL,
          article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
    )

    // 6) Insert topics
    .then(() => {
      const formattedTopics = topicData.map(({ slug, description, img_url }) => [
        slug,
        description,
        img_url,
      ]);
      const insertTopics = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L;`,
        formattedTopics
      );
      return db.query(insertTopics);
    })

    // 7) Insert users
    .then(() => {
      const formattedUsers = userData.map(({ username, name, avatar_url }) => [
        username,
        name,
        avatar_url,
      ]);
      const insertUsers = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L;`,
        formattedUsers
      );
      return db.query(insertUsers);
    })

    // 8) Insert articles
    .then(() => {
      const formattedArticles = articleData.map(
        ({ title, topic, author, body, created_at, votes, article_img_url }) => [
          title,
          body,
          votes,
          topic,
          author,
          article_img_url,
          new Date(created_at),
        ]
      );
      const insertArticles = format(
        `INSERT INTO articles 
          (title, body, votes, topic, author, article_img_url, created_at)
         VALUES %L;`,
        formattedArticles
      );
      return db.query(insertArticles);
    })

    // 9) Insert comments
    .then(() => {
      const formattedComments = commentData.map(
        ({ body, votes, author, article_id, created_at }) => [
          body,
          votes,
          author,
          article_id,
          new Date(created_at),
        ]
      );
      const insertComments = format(
        `INSERT INTO comments 
          (body, votes, author, article_id, created_at)
         VALUES %L;`,
        formattedComments
      );
      return db.query(insertComments);
    });
};

module.exports = seed;
