const Card = require('../models/cards');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cardsData) => { res.send(200, JSON.parse(cardsData)); })
    .catch(() => res.send(500, { message: 'An error has occurred' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then(() => {
      res.status(200).send({ message: 'card created seccessfully' });
    })
    .catch((err) => {
      res.status(500).send({ messege: `${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.user._id;
  Card.deleteOne(cardId)
    .then(() => {
      res.status(200).send('card has been deleted seccessfully');
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};
