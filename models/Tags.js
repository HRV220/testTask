const Sequelize = require("sequelize");
const dbContext = require("../Infrastructure/DbContext");

const Tag = dbContext.define("Tag", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Tag;
