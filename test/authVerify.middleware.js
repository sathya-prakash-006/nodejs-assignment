var expect = require("chai").expect;
const { verifyToken } = require("../src/middlewares/auth-token");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

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

  it("should throw an error if the token cannot be verified", function () {
    const req = {
      get: function (headername) {
        return "Bearer xyz";
      },
    };
    expect(verifyToken.bind(this, req, {}, () => {})).to.throw();
  });

  // it("should yield a userId after decoding the token", function () {
  //   var req = {
  //     get: function (headername) {
  //       return "Bearer xyz";
  //     },
  //   };
  //   sinon.stub(jwt, "verify");
  //   jwt.verify.returns({ id: "abc" });
  //   verifyToken(req, {}, () => {});
  //   expect(req).to.have.property("id");
  //   jwt.verify.restore();
  // });
});
