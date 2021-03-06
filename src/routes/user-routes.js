module.exports = (app) => {
  const express = require("express");
  const user = require("../controllers/user-controller");
  const { body } = require("express-validator");
  const authJwt = require("../middlewares/auth-token");

  const router = express.Router();

  // SIGNUP
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

  // SIGNIN
  router.post(
    "/auth/signin",
    body("email").isEmail({ min: 3 }).withMessage("Should be valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 characters "),
    user.signin
  );
  // User profile update ( name and email )
  router.patch("/profile/update/:id", authJwt.verifyToken, user.profileUpdate);
  // Get all the users (for admin)
  router.get("/all/users", authJwt.isAdmin, user.getAllUsers);
  // delete ths user by id (only for admin)
  router.delete("/user/delete/:id", authJwt.isAdmin, user.deleteUser);

  app.use("/api", router);
};
