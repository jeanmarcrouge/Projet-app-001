const { createCompany, updateCompany, getCompanyById } = require("../models/companyModel");
const { attachCompanyToUser, findUserById } = require("../models/userModel");

const upsertCompany = async (req, res, next) => {
  try {
    const { name, legalForm, taxRegime, vatRegime, employeesCount } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Company name is required." });
    }

    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let company;
    if (user.company_id) {
      company = await updateCompany(user.company_id, {
        name,
        legalForm,
        taxRegime,
        vatRegime,
        employeesCount: Number(employeesCount || 0),
      });
    } else {
      company = await createCompany({
        name,
        legalForm,
        taxRegime,
        vatRegime,
        employeesCount: Number(employeesCount || 0),
      });
      await attachCompanyToUser(user.id, company.id);
    }

    return res.json({ company });
  } catch (error) {
    return next(error);
  }
};

const getMyCompany = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user || !user.company_id) {
      return res.json({ company: null });
    }

    const company = await getCompanyById(user.company_id);
    return res.json({ company });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  upsertCompany,
  getMyCompany,
};
