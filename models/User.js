const Sequelize = require("sequelize");
const dbContext = require("../Infrastructure/DbContext");

const User = dbContext.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Добавим уникальность логина
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
