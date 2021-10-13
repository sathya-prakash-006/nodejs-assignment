const request = require("supertest");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");

const server = require("../src/index");

chai.use(chaiHttp);

describe("GET all summary ", () => {
  it("it should get all summary", (done) => {
    chai
      .request("http://localhost:2255")
      .get("/api/all/summary")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST summary", () => {
  it("it sould post the summary info", (done) => {
    const user = {
      accountNumber: 123456,
      income: 233,
      spends: 45,
      userId: 1,
    };

    chai
      .request("http://localhost:2255")
      .post("/api/summary")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});
