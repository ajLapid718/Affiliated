const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {

  dateOfGame: {
    type: Sequelize.STRING,
    allowNull: false
  },

  location: {
    type: Sequelize.STRING,
    allowNull: false
  },

  homeTeamScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  awayTeamScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

module.exports = Game;
