const Sequelize = require("sequelize");
require("dotenv").config();

class DbContext {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false, // Включаем логирование для отладки
      }
    );
  }
  async syncDatabase(force = false) {
    try {
      await this.sequelize.sync({ force });
      console.log("База данных синхронизирована!");
    } catch (error) {
      console.error("Ошибка синхронизации базы данных:", error);
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}

module.exports = new DbContext();
