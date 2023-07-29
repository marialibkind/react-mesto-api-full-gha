const jwt = require("jsonwebtoken");
const CustomError = require("../errors/customError");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new CustomError(401, "Вы не авторизированы");
  }
  try {
    req.user = jwt.verify(token, "******");
    next();
  } catch (error) {
    const error401 = new CustomError(401, "токен не действителен");
    next(error401);
  }
};

module.exports = auth;
