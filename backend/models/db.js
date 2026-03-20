const fs = require("fs/promises");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "saas_compliance",
});

const query = (text, params) => pool.query(text, params);

const initializeDatabase = async () => {
  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const seedPath = path.join(__dirname, "..", "db", "seed.sql");

  const schemaSql = await fs.readFile(schemaPath, "utf8");
  const seedSql = await fs.readFile(seedPath, "utf8");

  await query(schemaSql);
  await query(seedSql);
};

module.exports = {
  pool,
  query,
  initializeDatabase,
};
