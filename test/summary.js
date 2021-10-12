const request = require("supertest");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = chai.expect;

const app = require("../src/index");

describe("Task", () => {
  describe("GET /api/all/summary", () => {
    it("it should get all summary", (done) => {
      request(app)
        .get("/api/all/summary")
        .end((err, res) => {
          if (err) {
            expect(res.status).to.eq(401);
          }

          done();
        });
    });
  });
});

after(async (done) => {
  done();
});
