const { Pool } = require("pg");

// Set environment (development, test, etc.)
const ENV = process.env.NODE_ENV || "development";

// Load the correct .env file (e.g. .env.test or .env.development)
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// Safety check
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

// Set up the database config object
const config =
  process.env.DATABASE_URL // for production on Heroku, etc.
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      };

// Create the pool
const db = new Pool(config);

console.log(`Connected to ${process.env.PGDATABASE}`);

module.exports = db;
