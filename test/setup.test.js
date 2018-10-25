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

process.env.NODE_ENV = "test";

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

  return Promise.all([User.insertMany(users), Stat.insertMany(stats)]).then(
    ([users]) => {
      user = users[1];
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
describe("GET /stats", function() {
  it("Should get a users stats", function() {
    return (
      Stat.find({ userId: user.id }),
      chai
        .request(app)
        .get("/stats")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          console.log(res.body[0]);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body[0]).to.have.keys(
            "username",
            "played",
            "wins",
            "losses",
            "ties",
            "id",
            "money",
            "netGain",
            "userId"
          );
        })
    );
  });
});

// describe("PUT /stats", function() {
//   it("Should update a users stats", function() {
//     let id = "000000000000000000000102";
//     const newData = {
//       username: "aaron",
//       userId: "000000000000000000000002",
//       played: "20",
//       wins: "10",
//       losses: "8",
//       ties: "2",
//       id: "000000000000000000000102",
//       money: "120",
//       netGain: "20"
//     };
//     Stat.findOne({ userId: user.id });
//     return chai
//       .request(app)
//       .put(`/stats/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData)
//   })
//   .then(function(res) {
//     expect(res).to.have.status(200);

//   })
// });
