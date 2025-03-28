const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async register(RegistrationDTO) {
    try {
      //Check user don't exists
      const user = await this.userRepository.getUserByLogin(
        RegistrationDTO.login
      );
      if (user) {
        console.log("Пользователь существует");
        throw new Error("Пользователь существует");
      }
      if (RegistrationDTO.password !== RegistrationDTO.confirmedPassword) {
        console.log("Пароли не совпадают");
        throw new Error("Пароли не совпадают");
      }

      //Hash password
      const hashPassword = await bcrypt.hash(RegistrationDTO.password, 7);

      await this.userRepository.createUser(RegistrationDTO.login, hashPassword);
      console.log("Пользователь добавлен в БД");
      return { message: "Пользователь зарегистрировался" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login(LoginDTO) {
    try {
      const user = await this.userRepository.getUserByLogin(LoginDTO.login);
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

module.exports = AuthServices;
