const express = require("express");
const user = require("../controllers/user-controller");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/auth/signup",
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("name should be greater than 3"),
  body("email").isEmail({ min: 3 }).withMessage("Should be valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters "),
  user.signup
);
router.post(
  "/auth/sigin",
  body("email").isEmail({ min: 3 }).withMessage("Should be valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters "),
  user.signin
);

module.exports = router;
