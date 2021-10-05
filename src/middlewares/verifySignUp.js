const User = require("../models/user.model");

// checking duplicate username

module.exports = checkDuplicateEmail = (req, res, next) => {
  // Checking email is already exist or not

  User.findOne({
    where: {
      email: require.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send("Email is already exist");
    } else {
      next();
    }
  });
};
