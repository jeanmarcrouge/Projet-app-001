const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getMyCompany, upsertCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/me', authMiddleware, getMyCompany);
router.post('/', authMiddleware, upsertCompany);

module.exports = router;
