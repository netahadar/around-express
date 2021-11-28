const cards = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const cardsFilePath = path.join(__dirname, '../data/cards.json');

const readCardsFile = fsPromises.readFile(cardsFilePath, { encoding: 'utf-8' });

// Get full cards list
cards.get('/cards', (req, res) => {
  readCardsFile
    .then((cardsData) => { res.send(200, JSON.parse(cardsData)); })
    .catch(() => res.send(500, { message: 'An error has occurred' }));
});

module.exports = cards;
