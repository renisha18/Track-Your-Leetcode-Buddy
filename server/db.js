import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

console.log("USER =", process.env.DB_USER);
console.log("PASSWORD LENGTH =", process.env.DB_PASSWORD?.length);