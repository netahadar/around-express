const users = require('express').Router();

const bodyParser = require('body-parser');
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

const jsonParser = bodyParser.json();

// Get full users list
users.get('/users', getAllUsers);

// Get user by id
users.get('/users/:id', getUserById);

// Create a new user
users.post('/users', jsonParser, createUser);

module.exports = users;
