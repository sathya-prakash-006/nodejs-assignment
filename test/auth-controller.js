// const expect = require("chai").expect;
// const sinon = require("sinon");

// const User = require("../src/models/user.model");
// const { signin } = require("../src/controllers/user-controller");

// describe("Auth controller - Login", function () {
//   it("should throw an error with code 500 if accessing the database fails", function (done) {
//     sinon.stub(User, "findOne");
//     User.findOne.throws();

//     const req = {
//       body: {
//         email: "test@gmail.com",
//         password: "tester",
//       },
//     };
//     signin(req, {}, () => {}).then((result) => {
//       console.log(result);
//       //   expect(result).to.be.an("error");
//       //   expect(result).to.have.property("statusCode", 500);
//       result.should.have.status(500);
//       done();
//     });

//     User.findOne.restore();
//   });
// });
