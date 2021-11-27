const users = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsersFile =   fsPromises.readFile(usersFilePath, {encoding: 'utf-8'});

//Get full users list
users.get('/users', (req, res) => {
  readUsersFile
  .then((usersData)=> { res.send(200, JSON.parse(usersData));})
  .catch(() => res.send(500, { message: 'An error has occurred' }))
});

//Get user by id
users.get('/users/:id', (req, res) => {
  readUsersFile
  .then((usersData)=> {
    usersData = JSON.parse(usersData);
    const user = usersData.find((user) => user._id === req.params.id);
    if(!user){
      res.send(404, { message: 'User not found' });
      return;
    }else{
    res.send(200, user)}
  })
  .catch(() => res.send(500, { message: 'An error has occurred' }))
});

module.exports = users;