const { Player, Coach, Team } = require('../database/models');
const players = require('../data/players');
const coaches = require('../data/coaches');
const teams = require('../data/teams');

const populatePlayersTable = async (players) => {
}

const populateCoachesTable = async (coaches) => {
}

const populateTeamsTable = async (teams) => {
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
