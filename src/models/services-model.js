const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../config/db-config");

const Services = sequelize.define("services", {
  currentAccount: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  payRoll: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  payments: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  wallet: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  investments: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  taxpayment: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  loans: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Services;
