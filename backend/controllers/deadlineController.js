const { findUserById } = require('../models/userModel');
const { getUpcomingDeadlinesByCompany } = require('../models/deadlineModel');

async function listUpcomingDeadlines(req, res, next) {
  try {
    const user = await findUserById(req.user.id);

    if (!user || !user.company_id) {
      return res.status(400).json({
        message: 'No company profile found. Please create your company profile first.',
        deadlines: [],
      });
    }

    const deadlines = await getUpcomingDeadlinesByCompany(user.company_id, 20);

    return res.json({
      count: deadlines.length,
      deadlines,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listUpcomingDeadlines,
};
