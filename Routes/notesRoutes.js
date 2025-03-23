const Router = require("express");
const router = new Router();
const controller = require("../Controllers/NotesController");
const authMiddleware = require("../Middleware/authMiddleware");
const { check } = require("express-validator");

router.post(
  "/createNote",
  [check("title", "Название заметки не может быть пустым").notEmpty()],
  authMiddleware,
  controller.createNote
);
router.get("/getNotes", authMiddleware, controller.getNotes);
router.get("/getNote/:id", authMiddleware, controller.getNote);
router.put(
  "/updateNote/:id",
  [check("title", "Название заметки не может быть пустым").notEmpty()],
  authMiddleware,
  controller.updateNote
);
router.delete("/deleteNote/:id", authMiddleware, controller.deleteNote);

module.exports = router;
