const controle = require('../controleDeAcesso')

const metodos = {

  ler: {
    todos: 'readAny',
    apenasSeu: 'readOwn'
  },
  criar: {
    todos: 'createAny',
    apenasSeu: 'createOwn',

  },
  remover: {
    todos: 'deleteAny',
    apenasSeu: 'deleteOwn'
  }

}

module.exports = (entidade, acao) => (req, res, next) => {

  const permicaoDoCargo = controle.can(req.user.cargo)
  const acoes = metodos[acao]
  const permicaoTodos = permicaoDoCargo[acoes.todos](entidade)
  const permicaoApenasSeu = permicaoDoCargo[acoes.apenasSeu](entidade)
  
  if (permicaoTodos.granted === false && permicaoApenasSeu.granted === false) {
    res.status(403).json({mensage: 'Não permissão'})
    res.end()
    return
  }

  req.acesso = {
    todos: {
      permitido: permicaoTodos.granted,
      atributos: permicaoTodos.atributes
    },
    apenasSeu: {
      permitido: permicaoApenasSeu.granted,
      atributos: permicaoApenasSeu.atributes
    },
  }
  next()


}