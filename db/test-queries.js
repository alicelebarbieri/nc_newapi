const db = require("./connection");

// Get all users
db.query(`SELECT * FROM users;`)
  .then((result) => {
    console.log("All users:");
    console.table(result.rows);
  })

  // Get all articles where the topic is 'coding'
  .then(() => {
    return db.query(`SELECT * FROM articles WHERE topic = 'coding';`);
  })
  .then((result) => {
    console.log("\nArticles where topic is 'coding':");
    console.table(result.rows);
  })

  // Get all comments where votes are less than 0
  .then(() => {
    return db.query(`SELECT * FROM comments WHERE votes < 0;`);
  })
  .then((result) => {
    console.log("\nComments with votes < 0:");
    console.table(result.rows);
  })

  // Get all topics
  .then(() => {
    return db.query(`SELECT * FROM topics;`);
  })
  .then((result) => {
    console.log("\nAll topics:");
    console.table(result.rows);
  })

  // Get all articles by user 'grumpy19'
  .then(() => {
    return db.query(`SELECT * FROM articles WHERE author = 'grumpy19';`);
  })
  .then((result) => {
    console.log("\nArticles by user 'grumpy19':");
    console.table(result.rows);
  })

  // Get all comments with more than 10 votes
  .then(() => {
    return db.query(`SELECT * FROM comments WHERE votes > 10;`);
  })
  .then((result) => {
    console.log("\nComments with more than 10 votes:");
    console.table(result.rows);
  })

  // Always end connection!
  .finally(() => {
    db.end();
  });
