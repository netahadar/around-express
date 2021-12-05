const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cards = require('./routes/cards');
const users = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb');

// Temporary authorization
app.use((req, res, next) => {
  req.user = {
    _id: '61abfac86e224f006fae5af9',
  };

  next();
});

app.use(helmet());
app.use('/', users);
app.use('/', cards);

app.get('*', (req, res) => {
  res.send(404, { message: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
