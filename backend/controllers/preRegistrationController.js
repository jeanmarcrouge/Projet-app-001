const { createPreRegistration } = require('../models/preRegistrationModel');

async function registerInterest(req, res, next) {
  try {
    const { email, company_name } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const record = await createPreRegistration({
      email,
      company_name: company_name || null,
    });

    return res.status(201).json({
      message: 'Pre-registration received',
      record,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  registerInterest,
};
