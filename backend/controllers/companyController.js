const { createCompany, updateCompany, getCompanyById } = require('../models/companyModel');
const { findUserById, updateUserCompanyId } = require('../models/userModel');

async function getMyCompany(req, res, next) {
  try {
    const user = await findUserById(req.user.id);

    if (!user || !user.company_id) {
      return res.json({ company: null });
    }

    const company = await getCompanyById(user.company_id);
    return res.json({ company });
  } catch (error) {
    return next(error);
  }
}

async function upsertCompany(req, res, next) {
  try {
    const { name, legal_form, tax_regime, vat_regime, employees_count } = req.body;

    if (!name || !legal_form || !tax_regime || !vat_regime || employees_count === undefined) {
      return res.status(400).json({
        message: 'name, legal_form, tax_regime, vat_regime and employees_count are required',
      });
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const payload = {
      name,
      legal_form,
      tax_regime,
      vat_regime,
      employees_count: Number(employees_count),
    };

    let company;
    if (user.company_id) {
      company = await updateCompany(user.company_id, payload);
    } else {
      company = await createCompany(payload);
      await updateUserCompanyId(user.id, company.id);
    }

    return res.json({ company });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMyCompany,
  upsertCompany,
};
