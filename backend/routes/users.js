const usersRouter = require("express").Router();
const {
  getUsers, createUser, getUserId, setProfile, setAvatar, getInforCurrentUser, login, logOut,
} = require("../controllers/user");
const auth = require("../middlewares/auth");
const {
  userValidation, userUpdateValidation, userLoginValidation, userIdValidation,
  userUpdateAvatarValidation,
} = require("../utils/validate");

usersRouter.post("/signup", userValidation, createUser);
usersRouter.post("/signin", userLoginValidation, login);
usersRouter.get("/signout", logOut);

usersRouter.get("/users", auth, getUsers);
usersRouter.get("/users/me", auth, getInforCurrentUser);

usersRouter.get("/users/:userId", auth, userIdValidation, getUserId);
usersRouter.patch("/users/me", auth, userUpdateValidation, setProfile);
usersRouter.patch("/users/me/avatar", auth, userUpdateAvatarValidation, setAvatar);

module.exports = usersRouter;
