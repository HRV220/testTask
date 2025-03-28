const Router = require("express");
const router = new Router();
const NotesController = require("../Controllers/NotesController");
const NotesRepository = require("../Repositories/NotesRepository");
const NotesServices = require("../Services/NotesService");
const authMiddleware = require("../Middleware/authMiddleware");
const { check } = require("express-validator");

const notesRepository = new NotesRepository();
const notesService = new NotesServices(notesRepository);
const controller = new NotesController(notesService);

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Методы заметок
 */

/**
 * @swagger
 * /notes/createNote:
 *   post:
 *     summary: Создание заметки
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *               - tag
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Новая заметка"
 *               text:
 *                 type: string
 *                 example: "Здесь какой-то текст который храниться в заметке"
 *               tag:
 *                 type: integer
 *                 example: "null"
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка валидации
 */

router.post(
  "/createNote",
  [check("title", "Название заметки не может быть пустым").notEmpty()],
  authMiddleware,
  (req, res) => controller.createNote(req, res)
);

/**
 * @swagger
 * /notes/getNotes:
 *   get:
 *     summary: Получение всех заметок пользователя
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Фильтр по названию заметки
 *         required: false
 *         schema:
 *           type: string
 *           example: "Новая"
 *       - name: tag
 *         in: query
 *         description: Фильтр по тегу заметки
 *         required: false
 *         schema:
 *           type: integer
 *           example: "1"
 *     responses:
 *       200:
 *         description: Успешный ответ со списком заметок
 *       401:
 *         description: Неавторизованный доступ
 */

router.get("/getNotes", authMiddleware, (req, res) =>
  controller.getNotes(req, res)
);

/**
 * @swagger
 * /notes/getNote/{id}:
 *   get:
 *     summary: Получение одной заметки по ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Успешный ответ с данными заметки
 *       404:
 *         description: Заметка не найдена
 *       401:
 *         description: Неавторизованный доступ
 */

router.get("/getNote/:id", authMiddleware, (req, res) =>
  controller.getNote(req, res)
);
/**
 * @swagger
 * /notes/updateNote/{id}:
 *   put:
 *     summary: Обновление заметки по ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заметки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Обновленное название"
 *               text:
 *                 type: string
 *                 example: "Обновленный текст"
 *               tag:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Заметка успешно обновлена
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Заметка не найдена
 *       401:
 *         description: Неавторизованный доступ
 */
router.put(
  "/updateNote/:id",
  [check("title", "Название заметки не может быть пустым").notEmpty()],
  authMiddleware,
  (req, res) => controller.updateNote(req, res)
);
/**
 * @swagger
 * /notes/deleteNote/{id}:
 *   delete:
 *     summary: Удаление заметки по ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Заметка успешно удалена
 *       404:
 *         description: Заметка не найдена
 *       401:
 *         description: Неавторизованный доступ
 */
router.delete("/deleteNote/:id", authMiddleware, (req, res) =>
  controller.deleteNote(req, res)
);

module.exports = router;
