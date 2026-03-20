const express = require('express');
const { registerInterest } = require('../controllers/preRegistrationController');

const router = express.Router();

router.post('/', registerInterest);

module.exports = router;
