require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const urlRegex = require('./utils/regex');
const { login, createUser } = require('./controllers/users');
const index = require('./routes/index');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { handleNotFoundPage } = require('./middlewares/handleNotFoundPage');
const { handleCorsOrigin } = require('./middlewares/handleCorsOrigin');
const { handleCorsPreflight } = require('./middlewares/handleCorsPreflight');
const { limiter } = require('./middlewares/limiter');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(handleCorsOrigin);
app.use(handleCorsPreflight);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
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
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.use('*', handleNotFoundPage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
