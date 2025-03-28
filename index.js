const dbContext = require("./Infrastructure/DbContext");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const { User, Tag, Notes } = require("./Models/associations");
const express = require("express");
const mainRouter = require("./Routes/mainRouter");
const cors = require("cors");
//создаем объект приложения
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use(mainRouter);

dbContext.syncDatabase().then(() => {
  app.listen(3000, () => console.log("Сервер запущен!"));
});
