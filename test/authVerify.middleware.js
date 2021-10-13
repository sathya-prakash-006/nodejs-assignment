var expect = require("chai").expect;
const { verifyToken } = require("../src/middlewares/auth-token");

describe("Auth middleware", function () {
  it("it should throw an error if no authorization header", function () {
    const req = {
      get: function (headername) {
        return null;
      },
    };
    //req, res {}, next()
    expect(verifyToken.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated.....!"
    );
  });

  it("it should throw an error if authorization header  is only one string", function () {
    const req = {
      get: function (headername) {
        return "xyz";
      },
    };
    //req, res {}, next()
    expect(verifyToken.bind(this, req, {}, () => {})).to.throw();
  });
});
