const cards = require('express').Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');

// Get full cards list
cards.get('/cards', getAllCards);

// Create a new card
cards.post('/cards', createCard);

// Delete a card
cards.delete('/cards/:cardId', deleteCard);

module.exports = cards;
