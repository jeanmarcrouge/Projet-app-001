const { getCompanyById } = require("../models/companyModel");
const { getRelevantRegulations } = require("../models/regulationModel");
const { findUserById } = require("../models/userModel");

const listRelevantRegulations = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user || !user.company_id) {
      return res.json({
        regulations: [],
        message: "No company profile found. Please complete your profile first.",
      });
    }

    const company = await getCompanyById(user.company_id);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    const regulations = await getRelevantRegulations(company);
    return res.json({ regulations });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listRelevantRegulations,
};
