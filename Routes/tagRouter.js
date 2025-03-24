const Router = require("express");
const router = new Router();
const controller = require("../Controllers/TagController");
const authMiddleware = require("../Middleware/authMiddleware");
const { check } = require("express-validator");
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Методы тегов
 */

/**
 * @swagger
 * /tags/createTag:
 *   post:
 *     summary: Создание заметки
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "НОВЫЙ ТЕГ"
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка валидации
 */
router.post(
  "/createTag",
  [check("name", "Название тега не может быть пустым").notEmpty()],
  authMiddleware,
  controller.createTag
);
/**
 * @swagger
 * /tags/getTags:
 *   get:
 *     summary: Получение всех тегов пользователя
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ со списком тега
 *       401:
 *         description: Неавторизованный доступ
 */
router.get("/getTags", authMiddleware, controller.getTags);
/**
 * @swagger
 * /tags/getTag/{id}:
 *   get:
 *     summary: Получение одной заметки по ID
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тега
 *     responses:
 *       200:
 *         description: Успешный ответ с данными тега
 *       404:
 *         description: Тег не найдена
 *       401:
 *         description: Неавторизованный доступ
 */
router.get("/getTag/:id", authMiddleware, controller.getTag);

module.exports = router;
