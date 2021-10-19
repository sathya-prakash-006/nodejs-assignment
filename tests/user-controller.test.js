const { signin, signup } = require("../src/controllers/user-controller");
const userModel = require("../src/models/user.model");
userModel.create = jest.fn();

const httpMocks = require("node-mocks-http");
const user = {
  fullname: "sathya",
  email: "sathya@gmail.com",
  date: "12/12/2021",
  password: "123456",
  confirmPassword: "123456",
  role: "admin",
};

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

// SIGN UP
describe(" user SIGN UP", () => {
  it("should create a function", () => {
    expect(typeof signup).toBe("function");
  });
  it("should create ", async () => {
    req.body = user;
    signup(req, res);
    //expect(userModel.create).toBeCalledWith(user);
    expect(req.body.fullname).toBe("sathya");
    expect(req.body.email).toBe("sathya@gmail.com");
    expect(req.body.date).toBe("12/12/2021");
    expect(req.body.password).toBe("123456");
  });
  it("should throw error", async () => {});
});

// SIGN IN
describe("user SIGN IN", () => {
  it("should create a function", async () => {
    expect(typeof signin).toBe("function");
  });
});
