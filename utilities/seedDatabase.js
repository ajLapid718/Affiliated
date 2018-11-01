const { Player, Coach, Team } = require('../database/models');
const players = require('../data/players');
const coaches = require('../data/coaches');
const teams = require('../data/teams');

const populatePlayersTable = async (players) => {
  for (let i = 0; i < players.length; i++) {
    let currentPlayer = players[i];
    await Player.create(currentPlayer);
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

const seedDatabase = async () => {
  try {
    await populatePlayersTable(players);
    await populateCoachesTable(coaches);
    await populateTeamsTable(teams);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
