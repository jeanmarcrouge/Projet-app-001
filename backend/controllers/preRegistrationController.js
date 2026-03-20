const { createPreRegistration } = require("../models/preRegistrationModel");

const submitPreRegistration = async (req, res, next) => {
  try {
    const { email, companyName } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const preRegistration = await createPreRegistration({ email, companyName });
    return res.status(201).json({
      message: "Pre-registration received successfully.",
      preRegistration,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  submitPreRegistration,
};
