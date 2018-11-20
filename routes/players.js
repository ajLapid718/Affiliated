const express = require('express');
const router = express.Router();
const { Player } = require('../database/models');

// Find all the players;
router.get('/', function(req, res, next) {
  Player.findAll()
    .then(players => res.json(players))
    .catch(next)
});

// Find a specific, individual player;
router.get('/:id', function(req, res, next) {
  Player.findById(req.params.id) // findById() is deprecated, so findByPk (primary key) is more preferred moving forward;
    .then(player => res.json(player))
    .catch(next)
});

// Find all of the trainers who train a particular player;
// TODO: Provide an example of how to remove the JOIN table from coming up in the result from the query;
router.get('/:id/trainers', async function(req, res, next) {
  let foundPlayer;

  try {
    foundPlayer = await Player.findOne({ where: { id: req.params.id } });
  }
  catch (err) {
    next(err);
  }

  let trainersOfPlayer;

  try {
    trainersOfPlayer = await foundPlayer.getTrainers();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(trainersOfPlayer);
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
