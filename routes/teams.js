const express = require('express');
const router = express.Router();
const { Team, Game } = require('../database/models');

// Find all the teams;
router.get('/', function(req, res, next) {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
});

// Find a particular team and "eager load" all players who belong on/share the same team;
router.get('/:id/players', async function(req, res, next) {
  let foundTeam;

  try {
    foundTeam = await Team.findOne({ where: { id: req.params.id } });
  }
  catch (err) {
    next(err);
  }

  let playersOfTeam;

  try {
    playersOfTeam = await foundTeam.getPlayers();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(playersOfTeam);
});

// Find a particular team and respond with the coach of that particular team;
router.get('/:id/coach', async (req, res, next) => {
  let foundTeam;

  try {
    foundTeam = await Team.findOne({ where: { id: req.params.id } });
  }
  catch (err) {
    next(err);
  }

  let coachOfTeam;

  try {
    coachOfTeam = await foundTeam.getCoach();
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(coachOfTeam);
});

// Find all of the games of a particular team;
// NOTE: consider querying the Game table and finding which games have the particular teamId as either the homeTeamId OR (Sequelize operator) the awayTeamId;
router.get('/:id/games', async (req, res, next) => {
  let teamWithExhibitionGames;

  try {
    teamWithExhibitionGames = await Team.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Game,
          as: 'HomeGames'
        },
        {
          model: Game,
          as: 'AwayGames'
        }
      ]
    });
  }
  catch (err) {
    next(err);
  }

  res.status(200).json(teamWithExhibitionGames);
});

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
