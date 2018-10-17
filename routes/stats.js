const express = require("express");
const Stat = require("../models/stat");
const router = express.Router();
const passport = require("passport");

router.use(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true })
);

router.get("/", (req, res) => {
  Stat.find()
    .select("played wins losses")
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
    losses: req.body.losses
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
    losses: req.body.losses
  };
  return Stat.findOneAndUpdate({ _id: id }, newObj, { new: true })
    .select("played wins losses")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;