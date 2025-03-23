const bcrypt = require("bcrypt");
const UserRepository = require("../Repositories/UserRepository");
const jwt = require("jsonwebtoken");

class AuthServices {
  async register(login, password) {
    try {
      const user = await UserRepository.getUserByLogin(login);
      if (user) {
        console.log("Пользователь существует");
        return { message: "Пользователь существует" };
      }
      const hashPassword = await bcrypt.hash(password, 7);
      await UserRepository.createUser(login, hashPassword);
      console.log("Пользователь добавлен в БД");
      return { message: "Пользователь зарегистрировался" };
    } catch (error) {
      throw error;
    }
  }
  async login(login, password) {
    try {
      const user = await UserRepository.getUserByLogin(login);
      console.log(user);
      if (!user) {
        console.log("Пользователь не найден");
        return { message: "Пользователь не найден" };
      }
      console.log(user.password, password);
      if (!(await bcrypt.compare(password, user.password))) {
        console.log("Неверный пароль");
        throw new Error("Неверный пароль");
      }
      const token = jwt.sign({ id: user.id, login: user.login }, "secret", {
        expiresIn: "24h",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthServices();
