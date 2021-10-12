module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const authJwt = require("../middlewares/auth-token");
  const services = require("../controllers/services-controller");

  // upadate the services
  router.patch("/services/:id", authJwt.verifyToken, services.updateServices);

  // get all the services with user details

  router.get(
    "/user/services/:id",
    authJwt.verifyToken,
    services.getAllUsersAndServices
  );

  app.use("/api", router);
};
