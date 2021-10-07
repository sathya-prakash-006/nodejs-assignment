const express = require("express");
const router = express.Router();
const csvController = require("../controllers/transactions-controller");
const upload = require("../middlewares/upload");
const authJwt = require("../middlewares/auth-token");
// To bulk upload csv files
router.post("/upload", upload.single("file"), csvController.upload);

// To get all the transactions
router.get(
  "/transactions/:id",
  authJwt.verifyToken,
  csvController.getTransactions
);

module.exports = router;
