const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const CustomError = require("../errors/customError");
const {NODE_ENV, JWT_SECRET} = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new CustomError(401, "неправильная почта или пароль");
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "******", { expiresIn: "7d" });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: "Успешно" });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
      res.clearCookie("jwt").send({ message: "Кука успешно удалена." });
  } catch (err) {
      next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashpass = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: hashpass,
    });
    res.status(201).send({
      name, about, avatar, email,
    });
  } catch (error) {
    if (error.code === 11000) {
      const error409 = new CustomError(409, "Почта Уже используется");
      next(error409);
    } else {
      next(error);
    }
  }
};

const getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new CustomError(404, "Нет такого пользователя");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const setProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new CustomError(404, "Пользователь не обновлён");
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
    if (!user) {
      throw new CustomError(404, "Пользователь не обновлён");
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

const getInforCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new CustomError(404, "Пользователь не найден");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers, createUser, getUserId, setProfile, setAvatar, getInforCurrentUser, login, logOut
};
