// middleware for limiting requests

const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 10000, //10 seconds
  max: 2,
  message: "You have exceeded the 2 requests in 10 seconds limit!",
  headers: true,
});
const limitRate = {
  rateLimiterUsingThirdParty: rateLimiterUsingThirdParty,
};

module.exports = limitRate;
