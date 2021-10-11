const User = require("../models/user.model");
const Services = require("../models/services-model");
const { validationResult } = require("express-validator");

// To subscribe services
// 1 - currentAccount, payRoll, payments, wallet,investments, taxpayment, loans

// Subscribe or unsubscribe the services

exports.updateServices = async (req, res) => {
  const id = req.params.id;
  Services.findByPk(id)
    .then((service) => {
      //console.log(user);
      service.currentAccount = req.body.currentAccount;
      service.payRoll = req.body.payRoll;
      service.payments = req.body.payments;
      service.wallet = req.body.wallet;
      service.investments = req.body.investments;
      service.taxpayment = req.body.taxpayment;
      service.loans = req.body.loans;

      return service.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Services updated", services: result });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
};

/*********************************************************************************************** */

// Get users with current services by id

exports.getAllUsersAndServices = async function (req, res) {
  const id = req.params.id;
  // searching user exist or not using email
  const user = await User.findByPk(id);
  const services = await Services.findByPk(id);

  try {
    res.status(200).json({ users: user, services: services });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
