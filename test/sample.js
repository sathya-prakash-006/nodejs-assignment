// What is MOCHA ?

// -It's a testing framework for javascript
// -It runs on Node.js and the browser
// -We can use assertion library (e.g Chai, should.js ,. etc)
// -Mocha provides the hooks before(), after(), beforeEach(), and afterEach()
// -It makes it easy to test asynchronous code (Proises & async/await)

// What is CHAI ?

// -Chai is an assertion library for Node.js and the browser.
// -Can be paired with any Javascript testing framework (e.g Mocha)
// -Assertion with Chai provides natural languages assertion , exprerssive and readable sty;e.

// Should // Expect   // Assert

// Example tests
//const assert = require("assert");

// describe("file to be tested", () => {
//   context("functions to be tested", () => {
//     it("should do something", () => {
//       assert.equal(1, 1);
//     });
//     it("should do something", () => {
//       assert.deepEqual({ name: "sathya" }, { name: "sathya" });
//     });
//     it("this is the pending test"); // reminder pending tasks
//   });
// });
/*************************************************************************************** */

// before and after || before each and after each

// describe("file to be tested", () => {
//   context("functions to be tested", () => {
//     // before(() => {
//     //   console.log("===========before");
//     // });
//     // after(() => {
//     //   console.log("===========after");
//     // });
//     // beforeEach(() => {
//     //   console.log("=========before each");
//     // });
//     // afterEach(() => {
//     //   console.log("=========after each");
//     // });
//     it("should do something", () => {
//       assert.equal(1, 1);
//     });
//     it("should do something", () => {
//       assert.deepEqual({ name: "sathya" }, { name: "sathya" });
//     });
//     it("this is the pending test"); // reminder pending tasks
//   });

//   context("another function", () => {
//     it("do something");
//   });
// });
/************************************************************************************ */

// using chai and mocha

// const chai = require("chai");
// const expect = chai.expect;

// describe("chai test", () => {
//   it("should compare some values", () => {
//     expect(1).to.equal(1);
//   });
//   it("should test some other tests", () => {
//     expect({ name: "sathya" }).to.deep.equal({ name: "sathya" });
//     expect({ name: "foo" }).to.have.property("name").to.equal("foo");
//     expect(5 > 8).to.be.false;
//     expect({}).to.be.a("object");
//     expect("foo").to.be.a("string");
//     expect(3).to.be.a("number");
//     expect("bar").to.be.a("string").with.length(3);
//     expect([1, 2, 3].length).to.equal(3);
//     expect(undefined).to.not.exist;
//     expect(1).to.exist;
//   });
// });

/************************************************************************************ */
// DEMO'S

const add = function (a, b) {
  return a + b;
};

const addCallback = function (a, b, cb) {
  setTimeout(() => {
    return cb(null, a + b);
  }, 500);
};

const addPromise = function (a, b) {
  return Promise.resolve(a + b);
};

//spy on log

const foo = () => {
  //some operations
  console.log("was called");
  console.log("warn was called");
  return;
};

// stub createFile
const bar = async (fileName) => {
  await exports.createFile(fileName);
  let res = await cancelIdleCallback(fileName);
  return res;
};

/************************************************************************************ */

const chai = require("chai");
const expect = chai.expect;

describe("demo", () => {
  context("add", () => {
    it("should add two numbers", () => {
      expect(add(1, 2)).to.equal(3);
    });
  });

  context("callback add", () => {
    it("should test the callback", (done) => {
      addCallback(1, 2, (err, result) => {
        expect(err).to.not.exist;
        expect(result).to.equal(3);
        done();
      });
    });
  });
  context("test promise ", () => {
    it("should add with a promise cb", (done) => {
      addPromise(1, 2).then((result) => {
        expect(result).to.equal(3);
        done();
      });
    });
    it("should test promise with async await", async () => {
      let res = await addPromise(1, 2);

      expect(res).to.equal(3);
    });
  });
});
