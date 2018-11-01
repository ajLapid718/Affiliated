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

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
