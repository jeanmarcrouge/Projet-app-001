const { query } = require("./db");

const findUserByEmail = async (email) => {
  const result = await query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);
  return result.rows[0] || null;
};

const findUserById = async (id) => {
  const result = await query("SELECT id, email, company_id FROM users WHERE id = $1 LIMIT 1", [id]);
  return result.rows[0] || null;
};

const createUser = async ({ email, password, companyId = null }) => {
  const result = await query(
    "INSERT INTO users (email, password, company_id) VALUES ($1, $2, $3) RETURNING id, email, company_id",
    [email, password, companyId]
  );
  return result.rows[0];
};

const attachCompanyToUser = async (userId, companyId) => {
  const result = await query(
    "UPDATE users SET company_id = $1 WHERE id = $2 RETURNING id, email, company_id",
    [companyId, userId]
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  attachCompanyToUser,
};
