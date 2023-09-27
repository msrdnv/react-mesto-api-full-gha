require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const urlRegex = require('./utils/regex');
const { login, createUser } = require('./controllers/users');
const index = require('./routes/index');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { handleNotFoundPage } = require('./middlewares/handleNotFoundPage');

const { PORT, DB_URL } = process.env;
mongoose.connect(DB_URL);

const app = express();
const allowedCors = [
  'http://mesto-frontend.msrdnv.nomoredomainsrocks.ru',
  'https://mesto-frontend.msrdnv.nomoredomainsrocks.ru',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }
  return next();
});
app.use((req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', '*');
    return res.end();
  }
  return next();
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use('/', auth, index);
app.use(errors());
app.use(handleErrors);
app.use('*', handleNotFoundPage);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
