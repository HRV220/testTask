const Sequelize = require("sequelize");

class DbContext {
  constructor() {
    this.sequelize = new Sequelize("notes", "admin", "admin", {
      host: "localhost",
      dialect: "postgres",
      logging: true, // Включаем логирование для отладки
    });
  }
  //Логгирование БД
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
