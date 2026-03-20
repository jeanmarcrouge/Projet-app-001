const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { listRelevantRegulations } = require('../controllers/regulationController');

const router = express.Router();

router.get('/', authMiddleware, listRelevantRegulations);

module.exports = router;
