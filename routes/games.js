const express = require('express');
const router = express.Router();
const { Game, Team } = require('../database/models');

// Find all of the games of the season, with the homeTeam and awayTeam eager loaded;
router.get('/', async (req, res, next) => {
  let allGames;

  try {
    allGames = await Game.findAll({
      include: [
        {
          model: Team,
          as: 'HomeTeam'
        },
        {
          model: Team,
          as: 'AwayTeam'
        }
      ]
    });
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(allGames);
});

module.exports = router;
