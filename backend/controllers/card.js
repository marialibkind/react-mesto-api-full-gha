const Card = require("../models/card");
const CustomError = require("../errors/customError");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(card);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const userId = req.user._id;
    if (!card) {
      throw new CustomError(404, "Карточка не найдена");
    }
    if (card.owner.toString() !== userId) {
      throw new CustomError(403, "нет прав");
    }
    await card.deleteOne();
    res.send({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};

const addLikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new CustomError(404, "карточка не найдена");
    } else {
      res.send(card);
    }
  } catch (error) {
    next(error);
  }
};

const deleteLikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new CustomError(404, "карточка не найдена");
    } else {
      res.send(card);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
