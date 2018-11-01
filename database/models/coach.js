const Sequelize = require('sequelize');
const db = require('../db');

const Coach = db.define("coach", {

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = Coach;
