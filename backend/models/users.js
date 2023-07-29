const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Некорректные данные",
    },
  },
  about: {
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Некорректные данные",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
