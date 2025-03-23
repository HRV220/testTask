const Router = require("express");
const router = new Router();
const controller = require("../Controllers/AuthController");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть менее 4 символов").isLength({
      min: 4,
    }),
  ],
  controller.registration
);
router.post(
  "/login",
  [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть менее 4 символов").isLength({
      min: 4,
    }),
  ],
  controller.login
);

module.exports = router;
