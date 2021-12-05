const cards = require('express').Router();
const bodyParser = require('body-parser');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const jsonParser = bodyParser.json();

// Get full cards list
cards.get('/cards', getAllCards);

// Create a new card
cards.post('/cards', jsonParser, createCard);

// Delete a card
cards.delete('/cards/:cardId', deleteCard);

// Add like to card
cards.put('/cards/:cardId/likes', likeCard);

// Dislike card
cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cards;
