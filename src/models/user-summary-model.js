// CREATING MODEL FOR USER SUMMARY

const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../config/db-config");

const Summary = sequelize.define("summary", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  accountNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  income: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "0",
  },
  spends: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "0",
  },
});

module.exports = Summary;
