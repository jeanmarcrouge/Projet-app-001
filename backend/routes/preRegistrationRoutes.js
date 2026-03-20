const express = require("express");
const { submitPreRegistration } = require("../controllers/preRegistrationController");

const router = express.Router();

router.post("/", submitPreRegistration);

module.exports = router;
