const express = require("express");
const cors = require("cors");
const sequelize = require("../src/config/db-config");
const Sequelize = require("sequelize").Sequelize;
const bodyParser = require("body-parser");
const User = require("../src/models/user.model");
const Summary = require("../src/models/user-summary-model");
const Transaction = require("../src/models/transaction-model");
const Services = require("../src/models/services-model");

const dotenv = require("dotenv");
const { rateLimiterUsingThirdParty } = require("../src/middlewares/rateLimit");

const app = express();
dotenv.config();

global.__basedir = __dirname + "/..";
app.use(cors());
// Parse the requests(content-type- application/json)
app.use(bodyParser.json());
// parse the requests (content-type - x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Limiting 2 requests per 10 seconds
app.use(rateLimiterUsingThirdParty);

require("./routes/user-routes")(app);
require("./routes/user-summary-routes")(app);
require("./routes/transactions")(app);
require("./routes/services-routes")(app);

app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the banking app" });
});

// Creating relationships

// One to One (User and Summary)
// User to Summary (One to One Relation)
User.hasOne(Summary, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  },
});
Summary.belongsTo(User);

// User to Transaction ( One to Many Relation)
User.hasMany(Transaction, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  },
});
Transaction.belongsTo(User);

User.hasOne(Services, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  },
});
Services.belongsTo(User);

// PORT
const PORT = process.env.PORT || 2255;

sequelize
  //.sync({ force: true }) // force during production forcing to update table
  // syncs our model to database
  .sync()
  .then((result) => {
    //console.log(result);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
