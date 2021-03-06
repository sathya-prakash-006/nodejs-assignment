// Schema's
const User = require("../models/user.model");
const Services = require("../models/services-model");
//jwt and bcrypt
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
//middlewares
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const BadReqError = require("../errors/bad-request");

const secret = "secret";
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
    // res.send(new BadReqError("Email already Exist"));
  } else {
    const password = req.body.password;

    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      date: req.body.date,
      password: bcrypt.hashSync(password, 12),
      role: req.body.role,
    });

    try {
      await user.save();
      res
        .status(StatusCodes.CREATED)
        .json({ profile: user, message: "welcome to QBanking" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

/***********************************************************************************************************/
// SIGN IN

exports.signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    //console.log(user);

    if (!user) {
      return res.status(404).json("User Not Found..!!");
    }
    // comparing password
    const validPassword = await bcrypt.compare(password, user.password);

    // if validation fails
    if (!validPassword) {
      return res.status(404).json("Invalid Password");
    }

    let token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "2hr",
    });

    const isServices = await Services.findByPk(user.id);
    console.log(isServices);

    if (!isServices) {
      var services = new Services({
        userId: user.id,
      });
      await services.save();
    }

    return res.status(StatusCodes.OK).send({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      date: user.date,
      acessToken: token,
      services: services,
    });
  } catch (err) {
    res.status(500).send({ message: error.message });

    return;
  }
};

/***************************************************************************************************/
// USER Profile update by Id (name and email update)

exports.profileUpdate = (req, res) => {
  const id = +req.params.id;
  //console.log(id);

  User.findByPk(id)
    .then((user) => {
      //console.log(user);
      user.fullname = req.body.name || user.fullname;
      user.email = req.body.email || user.email;

      return user.save();
    })
    .then((result) => {
      res.status(StatusCodes.OK).json("Updated Prifile Successfully");
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

/*****************************************************************************************************/
// get all the users (for admin)

exports.getAllUsers = async function (req, res) {
  const user = await User.findAndCountAll();

  try {
    res.status(StatusCodes.OK).json({ users: user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/********************************************************************************************************/
// DELETE user by id  (only for admin)

exports.deleteUser = async function (req, res) {
  const id = req.params.id;

  await User.destroy({
    where: {
      id: id,
    },
  });

  try {
    res.status(StatusCodes.OK).json("User deleted");
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// exports.signin = (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({
//     where: {
//       email: email,
//     },
//   })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json("User Not Found..!!");
//       }
//       // comparing password
//       const validPassword = bcrypt.compareSync(password, user.password);

//       // if validation fails
//       if (!validPassword) {
//         return res.status(404).json("Invalid Password");
//       }
//       // creating json web token

//       let token = jwt.sign({ id: user.id }, secret, {
//         expiresIn: "2hr",
//       });

//       return res.status(200).send({
//         id: user.id,
//         fullname: user.fullname,
//         email: user.email,
//         date: user.date,
//         acessToken: token,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err });
//     });
// };
/************************************************************************************************ */
