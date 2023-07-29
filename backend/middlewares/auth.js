const jwt = require("jsonwebtoken");
const CustomError = require("../errors/customError");

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new CustomError(401, "Вы не авторизированы");
  }
  try {
    req.user = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "******");
    next();
  } catch (error) {
    const error401 = new CustomError(401, "токен не действителен");
    next(error401);
  }
};

module.exports = auth;
