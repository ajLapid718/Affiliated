// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Player = require('./player');
const Coach = require('./coach');
const Team = require('./team');
const Trainer = require('./trainer');
const Game = require('./game');

// Associations;
// Source.association(Target);

// O:M;
Team.hasMany(Player); // A one-to-many relationship that adds the column titled "teamId" to the table of players;
Player.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of players;

// O:O;
Team.hasOne(Coach); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;
Coach.belongsTo(Team); // A one-to-one relationship that adds the column titled "teamId" to the table of coaches;

// N:M;
Trainer.belongsToMany(Player, { through: 'TrainersPlayers' }); // A many-to-many relationship that generates a JOIN table called TrainersPlayers, which contains a column titled trainerId and a column titled playerId;
Player.belongsToMany(Trainer, { through: 'TrainersPlayers' }); // A many-to-many relationship that generates a JOIN table called TrainersPlayers, which contains a column titled trainerId and a column titled playerId;

// O:O with a double join on the same table;
// Team.belongsTo(Game, { as: 'HomeTeam', foreignKey: 'homeTeamId' }); // A one-to-one relationship that adds the column titled "homeTeamId" to the table of Games (When eager-loading, the model and the query need to use the same alias, which is the value of the "as" property);
// Team.belongsTo(Game, { as: 'AwayTeam', foreignKey: 'awayTeamId' }); // A one-to-one relationship that adds the column titled "awayTeamId" to the table of Games (When eager-loading, the model and the query need to use the same alias, which is the value of the "as" property);

Game.belongsTo(Team, { as: 'HomeTeam', foreignKey: 'homeTeamId' });
Game.belongsTo(Team, { as: 'AwayTeam', foreignKey: 'awayTeamId' });
Team.hasMany(Game, { as: 'HomeGames', foreignKey: 'homeTeamId' });
Team.hasMany(Game, { as: 'AwayGames', foreignKey: 'awayTeamId' });

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

The hasMany() association provides the following methods for the instance of the Source:

Using our specific example, hasMany() makes the following methods available and scenarios possible;

Team.hasMany(Player);

Team.getPlayers;
Team.setPlayers;
Team.addPlayer;
Team.createPlayer;
Team.removePlayer;
Team.hasPlayer;
Team.hasPlayers;

The belongsTo() association provides the following methods for the instance of the Source:

Using our specific example, belongsTo() makes the following methods available and scenarios possible;

Player.belongsTo(Team);

Player.getTeam;
Player.setTeam;
Player.createTeam;

Coach.belongsTo(Team);

Coach.getTeam;
Coach.setTeam;
Coach.createTeam;

The belongsToMany() association provides the following methods for the instance of the Source:

Using our specific example, belongsToMany() makes the following methods available and scenarios possible;

Trainer.belongsToMany(Player, { through: 'TrainersPlayers' });

Trainer.getPlayers;
Trainer.countPlayers;
Trainer.hasPlayer;
Trainer.hasPlayers;
Trainer.setPlayers;
Trainer.addPlayer;
Trainer.addPlayers;
Trainer.removePlayer;
Trainer.removePlayers;
Trainer.createPlayer;

Player.belongsToMany(Trainer, { through: 'TrainersPlayers' });

Player.getTrainers;
Player.countTrainers;
Player.hasTrainer;
Player.hasTrainers;
Player.setTrainers;
Player.addTrainer;
Player.addTrainers;
Player.removeTrainer;
Player.removeTrainers;
Player.createTrainer;

*/

module.exports = {
  Player,
  Coach,
  Team,
  Trainer,
  Game
};
