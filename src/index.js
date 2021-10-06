const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db-config");
const Sequelize = require("sequelize").Sequelize;
const bodyParser = require("body-parser");
const userRouter = require("./routes/user-routes");
const userSummary = require("./routes/user-summary-routes");

const User = require("./models/user.model");
const Summary = require("./models/user-summary-model");

const app = express();

app.use(cors());

// Parse the requests(content-type- application/json)
app.use(bodyParser.json());

// parse the requests (content-type - x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// api's

// Signup and signin
app.use("/api/", userRouter);

//
app.use("/api/", userSummary);

// Creating relationships

// One to One (User and Summary)
User.hasOne(Summary, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Summary.belongsTo(User);

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
