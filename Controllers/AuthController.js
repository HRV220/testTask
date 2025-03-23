const user = require("../Models/User");
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
    }
  }
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("login...");
      const { login, password } = req.body;
      const token = await authService.login(login, password);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new authController();
