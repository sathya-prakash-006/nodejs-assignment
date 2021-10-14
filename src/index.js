const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/db-config");
const Sequelize = require("sequelize").Sequelize;
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const Summary = require("./models/user-summary-model");
const Transaction = require("./models/transaction-model");
const Services = require("./models/services-model");
const dotenv = require("dotenv");
// request limiting middleware
const { rateLimiterUsingThirdParty } = require("./middlewares/rateLimit");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
dotenv.config();

global.__basedir = __dirname + "/..";

// Cross origin resource sharing
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

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the banking app" });
});

// 
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// error handler
app.use(errorHandler);

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
