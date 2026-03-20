const express = require("express");
const { upsertCompany, getMyCompany } = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMyCompany);
router.post("/", authMiddleware, upsertCompany);

module.exports = router;
