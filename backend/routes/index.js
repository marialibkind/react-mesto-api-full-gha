const router = require("express").Router();

const cardsRouter = require("./cards");
const usersRouter = require("./users");

const CustomError = require("../errors/customError");

router.use(cardsRouter);
router.use(usersRouter);

router.use((req, res, next) => {
  next(new CustomError(404, "Запрашиваемый ресурс не найден"));
});

module.exports = router;
