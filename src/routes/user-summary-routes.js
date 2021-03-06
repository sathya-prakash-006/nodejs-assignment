module.exports = (app) => {
  const express = require("express");
  const summary = require("../controllers/summary-controller");
  const router = express.Router();
  const authJwt = require("../middlewares/auth-token");

  router.post("/summary", authJwt.isAdmin, summary.createSummary);
  router.get("/summary/:id", authJwt.isAdmin, summary.getSummaryById);
  router.patch("/summary/update/:id", summary.summaryUpdate);
  router.get("/all/summary", authJwt.isAdmin, summary.getAllSummary);
  // router.post("/summary", summary.createSummary);
  // router.get("/summary/:id", summary.getSummaryById);
  // router.patch("/summary/update/:id", summary.summaryUpdate);
  // router.get("/all/summary", summary.getAllSummary);

  app.use("/api/", router);
};
