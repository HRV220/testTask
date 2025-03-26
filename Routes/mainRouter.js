const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const noteRouter = require("./notesRoutes");
const tagRouter = require("./tagRouter");

router.use("/auth", authRouter);
router.use("/notes", noteRouter);
router.use("/tags", tagRouter);

module.exports = router;
