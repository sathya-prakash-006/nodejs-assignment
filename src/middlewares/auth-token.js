// Middleware which checks authorization. If token is not provided then user will be restricted to access
// some of api's

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const secret = "secret";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token",
    });
  }

  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    if (decode.id != req.params.id) {
      console.log(decode.id, req.params.id);
      return res.status(401).send("You cannot access another user credentials");
    }
    next();
  });
};

// checking admin or not
const isAdmin = (req, res, next) => {
  const id = req.body.id;
  console.log();
  User.findByPk(id)
    .then((user) => {
      //console.log(user);
      if (user.role == "admin") {
        next();
        return;
      } else {
        return res.status(401).send("Only admin can access");
      }
    })
    .catch((err) => {
      return res.status(401).send(err.message);
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;

// const isAdmin = (req, res, next) => {
//   const id = req.body.id;
//   User.findByPk(id)
//     .then((user) => {
//       //console.log(user);
//       if (user.role == "admin") {
//         next();
//         return;
//       } else {
//         return res.status(401).send("Only admin can access");
//       }
//     })
//     .catch((err) => {
//       return res.status(401).send(err.message);
//     });
// };
