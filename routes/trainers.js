const express = require('express');
const router = express.Router();
const { Trainer } = require('../database/models');

// Find all the trainers;
router.get('/', function(req, res, next) {
  Trainer.findAll()
    .then(trainers => res.json(trainers))
    .catch(next)
});

// Find a particular trainer and eager load all players who this particular trainer trains;
// TODO: Provide an example of how to remove the JOIN table from coming up in the result from the query;
router.get('/:id/players', async function(req, res, next) {
  let foundTrainer;

  try {
    foundTrainer = await Trainer.findOne({ where: { id: req.params.id } });
  }
  catch (err) {
    next(err);
  }

  let playersOfTrainer;

  try {
    playersOfTrainer = await foundTrainer.getPlayers();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(playersOfTrainer);
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
