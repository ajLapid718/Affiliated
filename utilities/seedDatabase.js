const { Player, Coach, Team, Trainer } = require('../database/models');

const players = require('../data/players'); // 51 players;
const coaches = require('../data/coaches'); // 3 coaches;
const teams = require('../data/teams'); // 3 teams;
const trainers = require('../data/trainers'); // 2 trainers;

const populatePlayersTable = async (players) => {
  for (let i = 0; i < players.length; i++) {
    let currentPlayer = players[i];
    const builtPlayer = Player.build(currentPlayer);
    // console.log(Object.keys(builtPlayer.__proto__));

    if (i < 17) {
      builtPlayer.teamId = 1;
    }
    else if (i >= 17 && i < 34) {
      builtPlayer.teamId = 2;
    }
    else {
      builtPlayer.teamId = 3;
    }

    await builtPlayer.save();
  }
}

const populateCoachesTable = async (coaches) => {
  for (let i = 0; i < coaches.length; i++) {
    let currentCoach = coaches[i];
    await Coach.create(currentCoach);
  }
}

const populateTeamsTable = async (teams) => {
  for (let i = 0; i < teams.length; i++) {
    let currentTeam = teams[i];
    await Team.create(currentTeam);
  }
}

const populateTrainersTable = async (trainers) => {
  for (let i = 0; i < trainers.length; i++) {
    let currentTrainer = trainers[i];
    await Trainer.create(currentTrainer);
  }
}

const seedDatabase = async () => {
  try {
    await populateTeamsTable(teams);
    await populatePlayersTable(players);
    await populateCoachesTable(coaches);
    await populateTrainersTable(trainers);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
