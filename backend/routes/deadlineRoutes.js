const express = require("express");
const { listUpcomingDeadlines } = require("../controllers/deadlineController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, listUpcomingDeadlines);

module.exports = router;
