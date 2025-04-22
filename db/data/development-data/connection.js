const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
  });
  
const db = new Pool();

module.exports = db;