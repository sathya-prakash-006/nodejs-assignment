const request = require("supertest");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("POST user", () => {
  it("it should create users", (done) => {
    const user = {
      fullname: "test",
      email: "test@gmail.com",
      date: "12/12/2020",
      password: "123456",
      role: "user",
    };

    chai
      .request("http://localhost:2255")
      .post("/api/auth/signup")
      .send(user)
      .end((err, response) => {
        response.body.should.be.a("object");
        done();
      });
  });
});

describe("LOGIN", () => {
  it("it should login", (done) => {
    const user = {
      email: "test@gmail.com",
      password: "123456",
    };

    chai
      .request("http://localhost:2255")
      .post("/api/auth/sigin")
      .send(user)
      .end((err, response) => {
        response.body.should.be.a("object");

        done();
      });
  });
});
