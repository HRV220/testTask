const Router = require("express");
const router = new Router();
const controller = require("../Controllers/AuthController");
const { check } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Методы аутентификации
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка валидации
 */

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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *       400:
 *         description: Ошибка валидации
 */

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
