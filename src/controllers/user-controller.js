const User = require("../models/user.model");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const secret = "secret";

// SIGN IN

exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json("User Not Found..!!");
      }
      // comparing password
      const validPassword = bcrypt.compareSync(password, user.password);

      // if validation fails
      if (!validPassword) {
        return res.status(404).json("Invalid Password");
      }
      // creating json web token
      let token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "2hr",
      });
      return res.status(200).send({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        date: user.date,
        acessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
/************************************************************************************************ */
// SIGN UP (REGISTRATION)

exports.signup = async function (req, res) {
  // Error validation using express-validator
  try {
    const errors = validationResult(req);

    // if validation errors occurs
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
  } catch (error) {
    console.log(error);
  }

  // checking password and confirm password matching or not
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json("Password not matching");

  // searching user exist or not using email
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  // If user is already exist
  if (user) {
    res.status(409).json({
      message: "This login is already taken. Try another.",
    });
  } else {
    const password = req.body.password;
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      date: req.body.date,
      password: bcrypt.hashSync(password, 12),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      return res.status(400).json({ message: err });
    }
  }
};
