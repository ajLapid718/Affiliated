// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Player = require('./player');
const Coach = require('./coach');
const Team = require('./team');
const Trainer = require('./trainer');

// Associations;
// Source.association(Target);

// O:M;
Team.hasMany(Player); // A one-to-many relationship that adds the column titled "teamId" to the table of players;
Player.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of players;

// O:O;
Team.hasOne(Coach); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;
Coach.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;

// N:M;
Trainer.belongsToMany(Player, { through: 'TrainersPlayers' });
Player.belongsToMany(Trainer, { through: 'TrainersPlayers' });

/*

The hasOne() association provides the following methods for the instance of the Source;

Using our specific example, hasOne() makes the following methods available and scenarios possible;

Team.hasOne(Coach);

Team.getCoach;
Team.setCoach;
Team.addCoach;
Team.createCoach;
Team.removeCoach;
Team.hasCoach;

Similarly, the hasMany() association provides the following methods for the instance of the Source:

Team.hasMany(Player);

Team.getPlayers;
Team.setPlayers;
Team.addPlayer;
Team.createPlayer;
Team.removePlayer;
Team.hasPlayer;
Team.hasPlayers;

Similarly, the belongsTo() association provides the following methods for the instance of the Source:

Player.belongsTo(Team);

Player.getTeam;
Player.setTeam;
Player.createTeam;

Coach.belongsTo(Team);

Coach.getTeam;
Coach.setTeam;
Coach.createTeam;

*/

module.exports = {
  Player,
  Coach,
  Team,
  Trainer
};
