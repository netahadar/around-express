const User = require('../models/user');
const {
  NOTFOUND_ERROR_CODE,
  INVALIDDATA_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  createNotFoundError,
} = require('../constants/constants');

// Get full users list
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .orFail(createNotFoundError)
    .then((usersData) => res.status(200).send(usersData))
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOTFOUND_ERROR_CODE).send({ message: `${err.message}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: `${err.message}` });
    });
};

// Get user by Id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(createNotFoundError)
    .then((chosenUser) => res.status(200).send(chosenUser))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALIDDATA_ERROR_CODE).send({ message: `${err.message}` });
        return;
      } if (err.name === 'Not Found') {
        res.status(NOTFOUND_ERROR_CODE).send({ message: `${err.message}` });
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: `${err.message}` });
    });
};

// Create a new user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      res.status(200).send({ message: 'user created successfully' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALIDDATA_ERROR_CODE).send({ messege: `${err.message}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ messege: `${err.message}` });
    });
};

module.exports.updateUser = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then((updatedUser) => {
      res.status(200).send({ message: `User ${updatedUser} updated successfuly` });
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOTFOUND_ERROR_CODE).send({ message: `${err.message}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: `${err.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .orFail(createNotFoundError)
    .then(() => {
      res.status(200).send({ message: 'Avatar updated successfuly' });
    })
    .catch((err) => {
      if (err.name === 'Not Found') {
        res.status(NOTFOUND_ERROR_CODE).send({ message: `${err.message}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: `${err.message}` });
    });
};
