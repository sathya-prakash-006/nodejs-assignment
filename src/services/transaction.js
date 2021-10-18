const Transaction = require("../models/transaction-model");
const fs = require("fs");
const csv = require("fast-csv");
const { StatusCodes } = require("http-status-codes");

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is empty!! Please choose a CSV");
    }

    let transactions = [];
    let path = __basedir + "/downloads/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error;
      })
      .on("data", (row) => {
        transactions.push(row);
      })
      .on("end", () => {
        Transaction.bulkCreate(transactions)
          .then(() => {
            res.status(StatusCodes.CREATED).send({
              message:
                "Successfully uploaded the file : " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "something went wrong",
              error: error,
            });
          });
      });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      message: "Unable to upload the file: " + req.file.originalname,
      error,
    });
  }
};

// Get all the transactions based on user id
exports.getTransactionsById = (req, res) => {
  Transaction.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then((data) => {
      res.status(StatusCodes.OK).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// Get transactio details by pagination
exports.getTransactionsByPagination = (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.size || 2;
  const offset = (page - 1) * size;

  Transaction.findAndCountAll({
    where: {
      userId: req.params.id,
    },
    limit: size,
    offset: offset,
    order: [["id", "ASC"]],
  })
    .then((data) => {
      res.status(StatusCodes.OK).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// get all the transactions (for admin)

exports.getAllTransactions = (req, res) => {
  Transaction.findAndCountAll()
    .then((data) => {
      // console.log(data);
      res.status(StatusCodes.OK).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};
