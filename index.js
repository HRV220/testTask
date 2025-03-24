const dbContext = require("./Infrastructure/DbContext");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const { User, Tag, Notes } = require("./Models/associations");
const express = require("express");
const authRouter = require("./Routes/authRouter");
const noteRouter = require("./Routes/notesRoutes");
const tagRouter = require("./Routes/tagRouter");
const cors = require("cors");
//создаем объект приложения
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/notes", noteRouter);
app.use("/tags", tagRouter);

dbContext
  .sync({ force: false })
  .then(() => {
    console.log("База данных синхронизирована!");
  })
  .catch((err) => {
    console.error("Ошибка синхронизации базы данных:", err);
  });

// начинаем прослушивать подключения на 3000 порту
app.listen(3000, () => console.log("Сервер запущен!"));
