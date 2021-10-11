// CREATING MODEL FOR USER (ID,FULLNAME, DATE, EMAIL, DATE, PASSWORD, C-PASSWORD )

const Sequelize = require("sequelize").Sequelize;

const sequelize = require("../config/db-config");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "user",
  },
});

module.exports = User;
