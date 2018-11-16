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
router.get('/:id/players', async function(req, res, next) {
  const foundTrainer = await Trainer.findOne({where: { id: req.params.id }});
  res.json(await foundTrainer.getPlayers());
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
