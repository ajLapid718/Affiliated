// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Player = require('./player');
const Coach = require('./coach');
const Team = require('./team');

// Associations;
// Source.association(Target);

Team.hasMany(Player); // A one-to-many relationship that adds the column titled "teamId" to the table of players;
Player.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of players;

Team.hasOne(Coach); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;
Coach.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;

module.exports = {
  Player,
  Coach,
  Team
};
