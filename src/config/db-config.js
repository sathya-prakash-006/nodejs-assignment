const Sequelize = require("sequelize").Sequelize;

// connection pool
const sequelize = new Sequelize("bank_model", "root", "4Sn14ec066", { // database_name => root => password
  dialect: "mysql",    
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
