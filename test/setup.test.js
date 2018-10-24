"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../index");
const { TEST_DATABASE_URL, JWT_SECRET } = require("../config");
const { dbConnect, dbDisconnect } = require("../db-mongoose");

const Stat = require("../models/stat");
const User = require("../models/user");
const { users, stats } = require("../db/users");

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = "test";

// Clear the console before each run
process.stdout.write("\x1Bc\n");

const expect = chai.expect;
chai.use(chaiHttp);

describe("All of my Tests!", function() {
  let user = {};
  let token;
  before(function() {
    mongoose
      .connect(
        TEST_DATABASE_URL,
        { useNewUrlParser: true }
      )
      .then(() => mongoose.connection.db.dropDatabase())
      .then(() => {
        return Promise.all([
          User.insertMany(users),
          Stat.insertMany(stats)
        ]).then(([users]) => {
          user = users[0];
          token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
        });
      })
      .then(results => {
        console.info(
          `Completed ${results.length} Promises, inserting ${results.length /
            5} items`
        );
      })
      .then(() => mongoose.disconnect())
      .catch(err => {
        console.error(err);
      });
  });

  after(function() {
    return dbDisconnect();
  });

  describe("Mocha and Chai", function() {
    it("should be properly setup", function() {
      expect(true).to.be.true;
    });

    // it('Should return a users stats', function() {
    //   return Stat.find({ userId: user.id }), chai.request(require('../index')).get('/stats')
    //     .set("Authorization", `Bearer ${token}`)
    //     .then(([data, res]) => {
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.json;
    //       expect(res.body).to.be.a("array");
    //       expect(res.body).to.have.length(data.length);
    //     })
    // });
  });
  describe("GET /users", function() {
    it("Should create a new user", function() {
      const testUser = {
        username: "Aaron",
        password: "hello"
      };

      let res;
      return chai
        .request(app)
        .post("/users")
        .sent(testUser)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
        });
    });
  });
});
