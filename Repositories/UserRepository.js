const User = require("../Models/User");

class UserRepository {
  async getUserByLogin(login) {
    try {
      const user = await User.findOne({ where: { login } });
      console.log("Получен пользователь", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(login, password) {
    try {
      const newUser = await User.create({ login, password });
      console.log("Создан пользователь:", newUser);
    } catch (error) {
      console.log("Ошибка создания пользователя", error);
      throw error;
    }
  }
}

module.exports = new UserRepository();
