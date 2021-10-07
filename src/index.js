const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db-config");
const Sequelize = require("sequelize").Sequelize;
const bodyParser = require("body-parser");
const userRouter = require("./routes/user-routes");
const userSummary = require("./routes/user-summary-routes");
const User = require("./models/user.model");
const Summary = require("./models/user-summary-model");
const Transaction = require("./models/transaction-model");
const csvRouter = require("./routes/transactions");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

global.__basedir = __dirname + "/..";
app.use(cors());
// Parse the requests(content-type- application/json)
app.use(bodyParser.json());
// parse the requests (content-type - x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// api's

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Signup and signin
app.use("/api/", userRouter);

// user summary
app.use("/api/", userSummary);

// uploading bulk csv files
app.use("/api/csv", csvRouter);

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
