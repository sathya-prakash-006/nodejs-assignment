const express = require("express");
const summary = require("../controllers/summary-controller");
const router = express.Router();
const authJwt = require("../middlewares/auth-token");

// SIGNUP
router.post("/summary", summary.createSummary);

// SIGNIN
router.get("/summary/:userId", summary.getSummaryById);

// All summary for admin

router.get("/all/summary/", authJwt.isAdmin, summary.getAllSummary);

module.exports = router;
