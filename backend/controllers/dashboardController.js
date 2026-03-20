const { getCompanyById } = require("../models/companyModel");
const { getUpcomingDeadlinesByCompany } = require("../models/deadlineModel");
const { getRelevantRegulations } = require("../models/regulationModel");
const { findUserById } = require("../models/userModel");

const getDashboard = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user || !user.company_id) {
      return res.json({
        nextDeadlines: [],
        relevantRegulations: [],
        message: "No company profile linked to this account.",
      });
    }

    const company = await getCompanyById(user.company_id);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    const [deadlines, regulations] = await Promise.all([
      getUpcomingDeadlinesByCompany(company.id),
      getRelevantRegulations(company),
    ]);

    return res.json({
      nextDeadlines: deadlines.slice(0, 5),
      relevantRegulations: regulations.slice(0, 5),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDashboard,
};
