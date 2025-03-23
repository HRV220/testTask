const Sequelize = require("sequelize");
const dbContext = require("../Infrastructure/DbContext");

const Notes = dbContext.define("Notes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Notes;
