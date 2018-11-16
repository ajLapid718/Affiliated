const express = require('express');
const router = express.Router();
const { Team } = require('../database/models');

// Find all the teams;
router.get('/', function(req, res, next) {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
});

// Find a particular team and eager load all players who belong on/share the same team;
router.get('/:id/players', async function(req, res, next) {
  const foundTeam = await Team.findOne({where: { id: req.params.id }});
  res.json(await foundTeam.getPlayers());
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
