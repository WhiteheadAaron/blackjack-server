const express = require("express");
const Result = require("../models/result");
const router = express.Router();

router.get("/", (req, res) => {

    // res.json({
    //     "played": "20",
    //     "wins": "12",
    //     "losses": "8"
    // })
  Result.find()
    .select("played wins losses")
    .then(results => {
        console.log(results)
        res.json(results);
    })
    .catch(err => {
        next(err);
    });
});

router.post("/", (req, res, next) => {
    console.log(req.body)
  const newObj = {
    played: req.body.played,
    wins: req.body.wins,
    losses: req.body.losses
  };

  return Result.create(newObj)
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
  return Result.findOneAndUpdate({ _id: id }, newObj, { new: true })
    .select("played wins losses")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
