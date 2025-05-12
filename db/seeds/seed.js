const db = require("../connection");
const format = require("pg-format");
const { topics, users, articles, comments } = require("../data/test-data");

console.log("📝 comments sample keys:", Object.keys(comments[0] || {}));

const seed = async () => {
  // Drop in reverse dependency order
  await db.query("DROP TABLE IF EXISTS comments;");
  await db.query("DROP TABLE IF EXISTS articles;");
  await db.query("DROP TABLE IF EXISTS users;");
  await db.query("DROP TABLE IF EXISTS topics;");

  // Create tables
  await db.query(`
    CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY,
      description VARCHAR NOT NULL,
      img_url VARCHAR(1000)
    );`);
  await db.query(`
    CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      avatar_url VARCHAR(1000)
    );`);
  await db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug) NOT NULL,
      author VARCHAR REFERENCES users(username) NOT NULL,
      article_img_url VARCHAR(1000),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
  await db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      author VARCHAR REFERENCES users(username) NOT NULL,
      article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

  // Helper to bulk‐insert
  const insert = (table, columns, data, mapper) => {
    const values = data.map(mapper);
    const sql = format(
      `INSERT INTO ${table} (${columns.join(", ")}) VALUES %L;`,
      values
    );
    return db.query(sql);
  };

  // Seed data in order
  await insert(
    "topics",
    ["slug", "description", "img_url"],
    topics,
    ({ slug, description, img_url }) => [slug, description, img_url]
  );
  await insert(
    "users",
    ["username", "name", "avatar_url"],
    users,
    ({ username, name, avatar_url }) => [username, name, avatar_url]
  );
  await insert(
    "articles",
    ["title", "body", "votes", "topic", "author", "article_img_url", "created_at"],
    articles,
    ({ title, body, votes, topic, author, article_img_url, created_at }) => [
      title,
      body,
      votes,
      topic,
      author,
      article_img_url,
      new Date(created_at),
    ]
  );
  const { rows: insertedArticles } = await db.query(
    `SELECT article_id, title FROM articles;`
  );
  const titleToId = {};
  insertedArticles.forEach(({ article_id, title }) => {
    titleToId[title] = article_id;
  });
  await insert(
    "comments",
    ["body", "votes", "author", "article_id", "created_at"],
    comments,
    ({ body, votes, author, article_title, created_at }) => [
      body,
      votes,
      author,
      titleToId[article_title], 
      new Date(created_at),
    ]
  );
  const { rows } = await db.query("SELECT COUNT(*) FROM comments;");
  console.log("🛠️  comments in TEST DB:", rows[0].count);
  console.log("🛠️  Seeding DB:", process.env.PGDATABASE);
};

module.exports = seed;
