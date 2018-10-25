const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");

router.use(
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res) => {
  console.log(req.user)
  let userId = req.user.id
  Stat.find({userId: userId})
    .select("played wins losses money ties netGain bankruptcies userId username _id")
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const newObj = {
    played: req.body.played,
    wins: req.body.wins,
    losses: req.body.losses,
    ties: req.body.ties,
    money: req.body.money,
    netGain: req.body.netGain,
    bankruptcies: req.body.bankruptcies,
    userId: req.body.userId,
    username: req.body.username
  };

  return Stat.create(newObj)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`);
      res.status(201).json(results);
    })

    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error(err);
    });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newObj = {
    played: req.body.played,
    wins: req.body.wins,
    losses: req.body.losses,
    ties: req.body.ties,
    money: req.body.money,
    netGain: req.body.netGain,
    bankruptcies: req.body.bankruptcies
  };
  return Stat.findOneAndUpdate({ _id: id }, newObj, { new: true })
    .select("played wins losses ties money netGain")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
