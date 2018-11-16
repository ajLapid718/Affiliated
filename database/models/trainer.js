const Sequelize = require('sequelize');
const db = require('../db');

const Trainer = db.define("trainer", {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = Trainer;
