const express = require("express");
const router = express.Router();
const csvController = require("../services/transaction");
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

// to get transactions by pagiination

router.get(
  "/transactionsbypage/:id",
  csvController.getTransactionsByPagination
);

module.exports = router;
