const Card = require('../models/card');
const ForbiddenError = require('../utils/ForbiddenError');

const returnCardInfo = (data) => ({
  likes: data.likes,
  _id: data.id,
  name: data.name,
  link: data.link,
  owner: data.owner,
  createdAt: data.createdAt,
});

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data.map((item) => returnCardInfo(item))))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((data) => res.send(returnCardInfo(data)))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалять чужие карточки!'));
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .orFail()
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch(next);
};

const updateCardInfo = (update, req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, update, { new: true })
    .orFail()
    .then((data) => res.send(returnCardInfo(data)))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  updateCardInfo({ $addToSet: { likes: req.user._id } }, req, res, next);
};

module.exports.dislikeCard = (req, res, next) => {
  updateCardInfo({ $pull: { likes: req.user._id } }, req, res, next);
};
