const db = require("../db/connection");

exports.selectAllUsers = () => {
  return db
    .query("SELECT username, name, avatar_url FROM users;")
    .then(({ rows }) => rows);
};


exports.selectUserByUsername = (username) => {
  return db
    .query("SELECT username, name, avatar_url FROM users WHERE username = $1;", [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
      return rows[0];
    });
};