const express = require('express');
const cards = require('./routes/cards');
const app = express();
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use('/', users);
app.use('/', cards);

app.get('*', (req, res) => {
  res.send(404, {message: 'Page Not Found'})
})

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})