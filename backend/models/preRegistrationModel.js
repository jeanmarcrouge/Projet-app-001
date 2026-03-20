const { query } = require("./db");

const createPreRegistration = async ({ email, companyName }) => {
  const result = await query(
    `INSERT INTO pre_registrations (email, company_name)
     VALUES ($1, $2)
     ON CONFLICT (email)
     DO UPDATE SET company_name = EXCLUDED.company_name, created_at = NOW()
     RETURNING *`,
    [email, companyName]
  );
  return result.rows[0];
};

module.exports = {
  createPreRegistration,
};
