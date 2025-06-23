require("dotenv").config();
const { Pool } = require("pg");
const path = require("path");

// 1. (default: development)
const ENV = process.env.NODE_ENV || "development";

// 2. load vars from correct path
require("dotenv").config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// 3. ensure var settings
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

// 4. set connection pool 
const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      };

// 5. create connection pool and export
const db = new Pool(config);

if (ENV !== "production") {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

module.exports = db;
