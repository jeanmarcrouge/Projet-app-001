const pool = require('../config/db');

async function findUserByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id, email, password, company_id
     FROM users
     WHERE email = $1`,
    [email.toLowerCase()]
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, email, company_id
     FROM users
     WHERE id = $1`,
    [id]
  );

  return rows[0] || null;
}

async function createUser({ email, password }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email, company_id`,
    [email.toLowerCase(), password]
  );

  return rows[0];
}

async function updateUserCompanyId(userId, companyId) {
  const { rows } = await pool.query(
    `UPDATE users
     SET company_id = $1
     WHERE id = $2
     RETURNING id, email, company_id`,
    [companyId, userId]
  );

  return rows[0];
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserCompanyId,
};
