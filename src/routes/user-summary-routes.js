const express = require("express");
const { body } = require("express-validator");
const summary = require("../controllers/summary-controller");

const router = express.Router();

// SIGNUP
router.post("/summary", summary.createSummary);

// SIGNIN
router.get("/summary/:userId", summary.getSummaryById);

module.exports = router;
