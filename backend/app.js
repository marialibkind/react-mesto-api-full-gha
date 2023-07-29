require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/loger");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb", { family: 4 });

app.use(requestLogger);
app.use(cors({
  origin: "https://mesto-maria.nomoredomains.sbs",
  // origin: "http://localhost:3001",
  credentials: true,
}));
app.use(cookieParser());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервис запущен. Вы в безопасности. Порт: ${PORT}`);
});
