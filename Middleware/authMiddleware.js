const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, "secret");
    req.user = decodedData;
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
