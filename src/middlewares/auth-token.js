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
    req.userId = decode.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt