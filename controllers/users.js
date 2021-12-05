const User = require('../models/users');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((usersData) => { res.send(200, JSON.parse(usersData)); })
    .catch(() => res.send(500, { message: 'An error has occurred' }));
};

module.exports.getUserById = (req, res) => {
  User.fingById(req.params.id)
    .orFail(() => {
      res.send(404, { message: 'User not found' });
      throw Error;
    })
    .then((chosenUser) => {
      res.send(200, chosenUser);
    })
    .catch(() => res.send(500, { message: 'An error has occurred' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      res.status(200).send({ message: 'user created seccessfully' });
    })
    .catch((err) => {
      res.status(501).send({ messege: `${err.message}` });
    });
};
