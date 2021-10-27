// Middleware which checks authorization. If token is not provided then user will be restricted to access
// some of api's
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UnAuthenticatedError = require("../errors/un-authenticated");

const secret = "secret";

const verifyToken = (req, res, next) => {
  // let token = req.headers["x-access-token"];

  const token = req.get("Authorization");

  // if (!token) {
  //   const error = new Error("No Token");
  //   error.statusCode = 401;
  //   throw error;
  // }
  if (!token) {
    res.status(401)
    return res.send("No Token");
  }
  const newToken = token.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(newToken, secret);
  } catch (error) {
    error.status = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticated.");
    error.statusCode = 401;
    error.message = "Not Authenticated.";
    throw error;
  }

  if (decodedToken.id != req.params.id) {
    // console.log(decode.id, req.params.id);
    return res.status(401).send("You cannot access another user credentials");
  }
  req.params.id = decodedToken.id;

  next();
};

// checking admin or not
const isAdmin = (req, res, next) => {
  const id = req.body.id;
  //console.log();
  User.findByPk(id)
    .then((user) => {
      //console.log(user)
      if (user.role === "admin") {
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
