const Sequelize = require("sequelize");
const dbContext = require("../Infrastructure/DbContext");

const sequelizeInstance = dbContext.getSequelize();
console.log(
  "sequelizeInstance is Sequelize:",
  sequelizeInstance instanceof Sequelize
);
console.log(
  "sequelizeInstance.define is a function:",
  typeof sequelizeInstance.define === "function"
);

const User = dbContext.getSequelize().define("User", {
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
