const httpConstants = require('http2').constants;

module.exports.handleNotFoundPage = (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
};
