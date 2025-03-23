const Router = require("express");
const router = new Router();
const controller = require("../Controllers/TagController");
const authMiddleware = require("../Middleware/authMiddleware");
const { check } = require("express-validator");

router.post(
  "/createTag",
  [check("name", "Название тега не может быть пустым").notEmpty()],
  authMiddleware,
  controller.createTag
);
router.get("/getTags", authMiddleware, controller.getTags);
router.get("/getTag", authMiddleware, controller.getTag);

module.exports = router;
