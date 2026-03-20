const { getUpcomingDeadlinesByCompany } = require("../models/deadlineModel");
const { findUserById } = require("../models/userModel");

const listUpcomingDeadlines = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user || !user.company_id) {
      return res.json({ deadlines: [] });
    }

    const deadlines = await getUpcomingDeadlinesByCompany(user.company_id);
    return res.json({ deadlines });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listUpcomingDeadlines,
};
