const authJwt = require("../src/middlewares/auth-token");

const httpMocks = require("node-mocks-http");
const user = {
  email: "sathya@gmail.com",
  password: "123456",
};

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

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
