const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { listUpcomingDeadlines } = require('../controllers/deadlineController');

const router = express.Router();

router.get('/', authMiddleware, listUpcomingDeadlines);

module.exports = router;
