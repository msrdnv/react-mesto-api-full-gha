const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const returnUserInfo = (data) => ({
  name: data.name, about: data.about, avatar: data.avatar, email: data.email, _id: data._id,
});

module.exports.login = (req, res, next) => {
  User.findUser(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((data) => res.send(returnUserInfo(data)))
    .catch(next);
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data.map((item) => returnUserInfo(item))))
    .catch(next);
};

const getUserInfo = (userId, req, res, next) => {
  User.findById(userId)
    .orFail()
    .then((data) => res.send(returnUserInfo(data)))
    .catch(next);
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  getUserInfo(req.user._id, req, res, next);
};

module.exports.findUser = (req, res, next) => {
  getUserInfo(req.params.userId, req, res, next);
};

const updateUserInfo = (update, req, res, next) => {
  User.findByIdAndUpdate(req.user._id, update, { new: true, runValidators: true })
    .then((data) => res.send(returnUserInfo(data)))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  updateUserInfo({ name: req.body.name, about: req.body.about }, req, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  updateUserInfo({ avatar: req.body.avatar }, req, res, next);
};
