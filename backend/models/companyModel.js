const { query } = require("./db");

const createCompany = async ({ name, legalForm, taxRegime, vatRegime, employeesCount }) => {
  const result = await query(
    `INSERT INTO companies (name, legal_form, tax_regime, vat_regime, employees_count)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, legalForm, taxRegime, vatRegime, employeesCount]
  );
  return result.rows[0];
};

const updateCompany = async (companyId, { name, legalForm, taxRegime, vatRegime, employeesCount }) => {
  const result = await query(
    `UPDATE companies
     SET name = $1, legal_form = $2, tax_regime = $3, vat_regime = $4, employees_count = $5
     WHERE id = $6
     RETURNING *`,
    [name, legalForm, taxRegime, vatRegime, employeesCount, companyId]
  );
  return result.rows[0] || null;
};

const getCompanyById = async (companyId) => {
  const result = await query("SELECT * FROM companies WHERE id = $1 LIMIT 1", [companyId]);
  return result.rows[0] || null;
};

module.exports = {
  createCompany,
  updateCompany,
  getCompanyById,
};
