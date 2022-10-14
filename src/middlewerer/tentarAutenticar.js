const { middlewaresAutenticacao } = require('../usuarios')

module.exports = (req, res, next) => {
  req.estaAutenticado = false;
  if (req.get('authorization')) {
    return middlewaresAutenticacao.bearer(req, res, next)
  }

  next()


}