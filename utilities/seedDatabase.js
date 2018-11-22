const { Player, Coach, Team, Trainer, Game } = require('../database/models');

const players = require('../data/players'); // 51 players;
const coaches = require('../data/coaches'); // 3 coaches;
const teams = require('../data/teams'); // 3 teams;
const trainers = require('../data/trainers'); // 2 trainers;
const games = require('../data/games'); // 6 games;

const populatePlayersTable = async (players) => {
  let tylerrelph10 = await Trainer.create(trainers[0]); // Tyler Relph;
  let jlawbball = await Trainer.create(trainers[1]); // Jordan Lawley;

  for (let i = 0; i < players.length; i++) {
    let currentPlayer = players[i];
    let builtPlayer = await Player.build(currentPlayer);
    // console.log(Object.keys(builtPlayer.__proto__));

    if (i < 11) {
      builtPlayer.teamId = 1;
      await builtPlayer.save();
      await builtPlayer.addTrainer(tylerrelph10); // Players trained solely by Tyler Relph;
    }
    else if (i >= 11 && i < 22) {
      builtPlayer.teamId = 2;
      await builtPlayer.save();
      await builtPlayer.addTrainer(jlawbball); // Players trained solely by Jordan Lawley;
    }
    else if (i >= 22 && i < 33) {
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

// const populateTeamsTable = async (teams) => {
//   for (let i = 0; i < teams.length; i++) {
//     let currentTeam = teams[i];
//     await Team.create(currentTeam);
//   }
// }

// const populateTrainersTable = async (trainers) => {
//   for (let i = 0; i < trainers.length; i++) {
//     let currentTrainer = trainers[i];
//     await Trainer.create(currentTrainer);
//   }
// }

const populateGamesTable = async (games) => {
  let celtics = await Team.create(teams[0]);
  let knicks = await Team.create(teams[1]);
  let warriors = await Team.create(teams[2]);

  for (let i = 0; i < games.length; i++) {
    let currentGame = games[i];
    let builtGame = await Game.build(currentGame);

    if (currentGame.location === "Boston") {
      await builtGame.save();
      await builtGame.setHomeTeam(celtics);
      await builtGame.setAwayTeam(knicks);
    }
    else if (currentGame.location === "New York") {
      await builtGame.save();
      await builtGame.setHomeTeam(knicks);
      await builtGame.setAwayTeam(celtics);
    }
    else if (currentGame.location === "Oakland") {
      await builtGame.save();
      await builtGame.setHomeTeam(warriors);
      await builtGame.setAwayTeam(knicks);
    }
  }
}

const seedDatabase = async () => {
  try {
    // await populateTeamsTable(teams);
    await populateGamesTable(games);
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
