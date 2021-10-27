const authJwt = require("../src/middlewares/auth-token");

describe("verifyToken", () => {
  it("should create a function", () => {
    expect(typeof authJwt.verifyToken).toBe("function");
  });
});

describe("isAdmin", () => {
  it("should create a function", () => {
    expect(typeof authJwt.isAdmin).toBe("function");
  });
});
