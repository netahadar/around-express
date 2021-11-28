const express = require('express');
const helmet = require('helmet');
const cards = require('./routes/cards');

const app = express();
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use('/', users);
app.use('/', cards);

app.get('*', (req, res) => {
  res.send(404, { message: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
