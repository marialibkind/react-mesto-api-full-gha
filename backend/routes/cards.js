const cardsRouter = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
} = require("../controllers/card");
const { cardValidation, cardValidationId } = require("../utils/validate");

cardsRouter.get("/cards", auth, getCards);
cardsRouter.post("/cards", auth, cardValidation, createCard);
cardsRouter.delete("/cards/:cardId", auth, cardValidationId, deleteCard);
cardsRouter.put("/cards/:cardId/likes", auth, cardValidationId, addLikeCard);
cardsRouter.delete("/cards/:cardId/likes", auth, cardValidationId, deleteLikeCard);

module.exports = cardsRouter;
