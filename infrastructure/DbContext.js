const Sequelize = require("sequelize");

const sequelize = new Sequelize("notes", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: true, // Включаем логирование для отладки
});

module.exports = sequelize;
