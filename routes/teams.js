const express = require('express');
const router = express.Router();
const { Team } = require('../database/models');

// Find all the teams;
router.get('/', function(req, res, next) {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
