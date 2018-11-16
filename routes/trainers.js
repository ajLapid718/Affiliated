const express = require('express');
const router = express.Router();
const { Trainer } = require('../database/models');

// Find all the trainers;
router.get('/', function(req, res, next) {
  Trainer.findAll()
    .then(trainers => res.json(trainers))
    .catch(next)
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
