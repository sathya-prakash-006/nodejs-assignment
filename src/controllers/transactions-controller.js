const Transaction = require("../models/transaction-model");

const fs = require("fs");
const csv = require("fast-csv");
// const CsvParser = require("json2csv").Parser;

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
            res.status(200).send({
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
exports.getTransactions = (req, res) => {
  Transaction.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

// Get transactions based on page , query
exports.getTransactionsByPagination = (req, res) => {
  
};
