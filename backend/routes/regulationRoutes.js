const express = require("express");
const { listRelevantRegulations } = require("../controllers/regulationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, listRelevantRegulations);

module.exports = router;
