const postsControlador = require('./posts-controlador')
const { middlewaresAutenticacao } = require('../usuarios')
const autorizacao = require('../middlewerer/autorizacao')
const tentarAutenticar = require('../middlewerer/tentarAutenticar')
const tentarAutorizar = require('../middlewerer/tentarAutorizar')

module.exports = app => {
  app
    .route('/post')
    .get(
      [tentarAutenticar, tentarAutorizar('post', 'ler')],
      postsControlador.lista
    )
    .post(
      [middlewaresAutenticacao.bearer,
      autorizacao('post', 'criar')],
      postsControlador.adiciona
    )

  app.route('/post/:id')
    .get(
      [middlewaresAutenticacao.bearer,
      autorizacao(['post', 'ler'])],
      postsControlador.obterDetalhes
    )
    .delete(
      [middlewaresAutenticacao.bearer, autorizacao(['post', 'remover'])],
      postsControlador.remover
    )
}
