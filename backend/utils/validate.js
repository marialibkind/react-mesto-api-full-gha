const { Joi, celebrate } = require("celebrate");
const validator = require("valid-url");

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isWebUri(value)) {
        return helper.error("это не url");
      }
      return value;
    }),
  }),
});

const cardValidationId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (!validator.isWebUri(value)) {
        return helper.error("это не url");
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const userUpdateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (!validator.isWebUri(value)) {
        return helper.error("это не url");
      }
      return value;
    }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  cardValidation,
  cardValidationId,
  userValidation,
  userUpdateValidation,
  userLoginValidation,
  userIdValidation,
  userUpdateAvatarValidation,
};
