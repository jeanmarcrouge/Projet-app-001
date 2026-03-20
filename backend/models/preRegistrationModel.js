const pool = require('../config/db');

async function createPreRegistration({ email, company_name }) {
  const { rows } = await pool.query(
    `INSERT INTO pre_registrations (email, company_name)
     VALUES ($1, $2)
     ON CONFLICT (email)
     DO UPDATE SET company_name = EXCLUDED.company_name,
                   created_at = NOW()
     RETURNING id, email, company_name, created_at`,
    [email.toLowerCase(), company_name]
  );

  return rows[0];
}

module.exports = {
  createPreRegistration,
};
