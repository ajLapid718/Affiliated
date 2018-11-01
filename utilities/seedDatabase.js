const { Player } = require('../database/models');

const populatePlayersTable = async () => {
  await Promise.all([
    Player.create({
      firstName: "Kyrie",
      lastName: "Irving",
      jerseyNumber: 11
    }),
    Player.create({
      firstName: "LeBron",
      lastName: "James",
      jerseyNumber: 23
    }),
    Player.create({
      firstName: "Luka",
      lastName: "Doncic",
      jerseyNumber: 77
    })
  ]);
}

const seedDatabase = async () => {
  try {
    await populatePlayersTable();
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase();
