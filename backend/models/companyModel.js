const pool = require('../config/db');

async function createCompany(company) {
  const { name, legal_form, tax_regime, vat_regime, employees_count } = company;
  const { rows } = await pool.query(
    `INSERT INTO companies (name, legal_form, tax_regime, vat_regime, employees_count)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, legal_form, tax_regime, vat_regime, employees_count`,
    [name, legal_form, tax_regime, vat_regime, employees_count]
  );

  return rows[0];
}

async function updateCompany(companyId, company) {
  const { name, legal_form, tax_regime, vat_regime, employees_count } = company;
  const { rows } = await pool.query(
    `UPDATE companies
     SET name = $1,
         legal_form = $2,
         tax_regime = $3,
         vat_regime = $4,
         employees_count = $5
     WHERE id = $6
     RETURNING id, name, legal_form, tax_regime, vat_regime, employees_count`,
    [name, legal_form, tax_regime, vat_regime, employees_count, companyId]
  );

  return rows[0] || null;
}

async function getCompanyById(companyId) {
  const { rows } = await pool.query(
    `SELECT id, name, legal_form, tax_regime, vat_regime, employees_count
     FROM companies
     WHERE id = $1`,
    [companyId]
  );

  return rows[0] || null;
}

module.exports = {
  createCompany,
  updateCompany,
  getCompanyById,
};
