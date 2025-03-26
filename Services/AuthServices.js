const bcrypt = require("bcrypt");
const UserRepository = require("../Repositories/UserRepository");
const jwt = require("jsonwebtoken");

class AuthServices {
  async register(RegistrationDTO) {
    try {
      //Check user don't exists
      const user = await UserRepository.getUserByLogin(RegistrationDTO.login);
      if (user) {
        console.log("Пользователь существует");
        return new Error("Пользователь существует");
      }
      if (RegistrationDTO.password !== RegistrationDTO.confirmedPassword) {
        console.log("Пароли не совпадают");
        return new Error("Пароли не совпадают");
      }

      //Hash password
      const hashPassword = await bcrypt.hash(RegistrationDTO.password, 7);

      await UserRepository.createUser(RegistrationDTO.login, hashPassword);
      console.log("Пользователь добавлен в БД");
      return { message: "Пользователь зарегистрировался" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login(LoginDTO) {
    try {
      const user = await UserRepository.getUserByLogin(LoginDTO.login);
      //Проверка на существование пользователя в БД
      if (!user) {
        console.log("Пользователь не найден");
        throw new Error("Пользователь не найден");
      }
      //Сравнение паролей и проверка что он корректный
      if (!(await bcrypt.compare(LoginDTO.password, user.password))) {
        console.log("Неверный пароль");
        throw new Error("Неверный пароль");
      }
      //Создание токена
      const token = jwt.sign({ id: user.id, login: user.login }, "secret", {
        expiresIn: "24h",
      });
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new AuthServices();
