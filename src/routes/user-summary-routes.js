const express = require("express");
const summary = require("../controllers/summary-controller");
const router = express.Router();
const authJwt = require("../middlewares/auth-token");

// create Sumamry (only admin can create summary)
router.post("/summary", authJwt.isAdmin, summary.createSummary);

// Get sumamry details
router.get("/summary/:id", authJwt.verifyToken, summary.getSummaryById);

// Update Summary

router.patch("/summary/update/:id", summary.summaryUpdate);

// All summary for admin

router.get("/all/summary/", authJwt.isAdmin, summary.getAllSummary);

module.exports = router;
