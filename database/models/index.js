// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Player = require('./player');
const Coach = require('./coach');
const Team = require('./team');

module.exports = {
  Player,
  Coach,
  Team
};
