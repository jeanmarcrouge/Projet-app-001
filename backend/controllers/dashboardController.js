const { findUserById } = require('../models/userModel');
const { getCompanyById } = require('../models/companyModel');
const { getActiveRegulations } = require('../models/regulationModel');
const { getUpcomingDeadlinesByCompany } = require('../models/deadlineModel');
const { getRelevantRegulations } = require('../services/rulesEngine');

async function getDashboardData(req, res, next) {
  try {
    const user = await findUserById(req.user.id);

    if (!user || !user.company_id) {
      return res.status(400).json({
        message: 'No company profile found. Please create your company profile first.',
        deadlines: [],
        regulations: [],
      });
    }

    const company = await getCompanyById(user.company_id);
    const [deadlines, regulations] = await Promise.all([
      getUpcomingDeadlinesByCompany(user.company_id, 5),
      getActiveRegulations(),
    ]);

    const relevantRegulations = getRelevantRegulations(company, regulations);

    return res.json({
      company,
      deadlines,
      regulations: relevantRegulations,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getDashboardData,
};
