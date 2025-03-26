const LoginDTO = require("../Models/DTO/LoginDTO");
const RegistrationDTO = require("../Models/DTO/RegistrationDTO");
const authService = require("../Services/AuthServices");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Регистрация...");
      const { login, password } = req.body;
      const user = await authService.register(login, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  async login(req, res) {
    try {
      //Валидация
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const loginDTO = new LoginDTO(req.body.login, req.body.password);
      //Получение токена
      const token = await authService.login(loginDTO);
      //Возвращение результата
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = new authController();
