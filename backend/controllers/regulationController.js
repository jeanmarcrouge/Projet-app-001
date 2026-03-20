const { findUserById } = require('../models/userModel');
const { getCompanyById } = require('../models/companyModel');
const { getActiveRegulations } = require('../models/regulationModel');
const { getRelevantRegulations } = require('../services/rulesEngine');

async function listRelevantRegulations(req, res, next) {
  try {
    const user = await findUserById(req.user.id);

    if (!user || !user.company_id) {
      return res.status(400).json({
        message: 'No company profile found. Please create your company profile first.',
        regulations: [],
      });
    }

    const company = await getCompanyById(user.company_id);
    const regulations = await getActiveRegulations();
    const relevantRegulations = getRelevantRegulations(company, regulations);

    return res.json({
      company,
      count: relevantRegulations.length,
      regulations: relevantRegulations,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listRelevantRegulations,
};
