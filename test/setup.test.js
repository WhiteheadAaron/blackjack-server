"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { app } = require("../index");
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

let user = {};
let token;
before(function() {
  return dbConnect(TEST_DATABASE_URL).then(() => {
    mongoose.connection.db.dropDatabase();
  });
});

beforeEach(function() {
  mongoose.connection.db.dropDatabase();
  let token;
  let user;

  return Promise.all([User.insertMany(users), Stat.insertMany(stats)]).then(
    ([users]) => {
      user = users[0];
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    }
  );
});

afterEach(function() {
  return mongoose.connection.db.dropDatabase();
});

after(function() {
  return dbDisconnect();
});

describe("Mocha and Chai", function() {
  it("should be properly setup", function() {
    expect(true).to.be.true;
  });
  it("Should create a new user", function() {
    const newUser = {
      username: "Nik",
      password: "doggiedog"
    };
    let res;
    return chai
      .request(app)
      .post("/users")
      .send(newUser)
      .then(_res => {
        res = _res;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.exist;
      });
  });
});
describe("GET /users", function() {
  it("Should sign a user in", function() {
    const testUser = {
      username: "aaron",
      password: "hello"
    };
    let res;
    return chai
      .request(app)
      .post("/login")
      .send(testUser)
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
      });
  });
});
