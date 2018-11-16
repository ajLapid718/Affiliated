const { Player, Coach, Team, Trainer } = require('../database/models');

const players = require('../data/players'); // 51 players;
const coaches = require('../data/coaches'); // 3 coaches;
const teams = require('../data/teams'); // 3 teams;
const trainers = require('../data/trainers'); // 2 trainers;

const populatePlayersTable = async (players) => {
  let tylerrelph10 = await Trainer.create(trainers[0]); // Tyler Relph;
  let jlawbball = await Trainer.create(trainers[1]); // Jordan Lawley;

  for (let i = 0; i < players.length; i++) {
    let currentPlayer = players[i];
    let builtPlayer = await Player.build(currentPlayer);
    // console.log(Object.keys(builtPlayer.__proto__));

    if (i < 17) {
      builtPlayer.teamId = 1;
      await builtPlayer.save();
      await builtPlayer.addTrainer(tylerrelph10); // Players trained solely by Tyler Relph;
    }
    else if (i >= 17 && i < 34) {
      builtPlayer.teamId = 2;
      await builtPlayer.save();
      await builtPlayer.addTrainer(jlawbball); // Players trained solely by Jordan Lawley;
    }
    else {
      builtPlayer.teamId = 3;
      await builtPlayer.save();
      await builtPlayer.addTrainer(tylerrelph10); // Players trained by both Tyler Relph...;
      await builtPlayer.addTrainer(jlawbball); // ...and by Jordan Lawley, too;
    }
  }
}

const populateCoachesTable = async (coaches) => {
  for (let i = 0; i < coaches.length; i++) {
    let currentCoach = coaches[i];
    let builtCoach = await Coach.build(currentCoach);
    builtCoach.teamId = i + 1;
    await builtCoach.save();
  }
}

const populateTeamsTable = async (teams) => {
  for (let i = 0; i < teams.length; i++) {
    let currentTeam = teams[i];
    await Team.create(currentTeam);
  }
}

// const populateTrainersTable = async (trainers) => {
//   for (let i = 0; i < trainers.length; i++) {
//     let currentTrainer = trainers[i];
//     await Trainer.create(currentTrainer);
//   }
// }

const seedDatabase = async () => {
  try {
    await populateTeamsTable(teams);
    await populatePlayersTable(players);
    await populateCoachesTable(coaches);
    // await populateTrainersTable(trainers);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
