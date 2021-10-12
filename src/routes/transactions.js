module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const csvController = require("../services/transaction");
  const upload = require("../middlewares/upload");
  const authJwt = require("../middlewares/auth-token");

  router.post("/upload", upload.single("file"), csvController.upload);

  // To get all the transactions of particular user
  router.get("/transactions/:id", csvController.getTransactionsById);

  // to get transactions by pagiination

  router.get(
    "/transactionsbypage/:id",
    authJwt.verifyToken,
    csvController.getTransactionsByPagination
  );

  // Get all the transactions (for admin)
  router.get(
    "/all/transactions",
    authJwt.isAdmin,
    csvController.getAllTransactions
  );

  app.use("/api/csv", router);
};
