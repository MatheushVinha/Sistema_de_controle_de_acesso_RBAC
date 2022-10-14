const AcessControll = require('accesscontrol')
const controle = new AcessControll()


controle
      .grant('assinante')
      .readAny('post', ['id','titilo', 'conteudo', 'autoror'])

controle
      .grant('editor')
      .extend('assinante')
      .createOwn('post')
      .deleteOwn('post')
controle 
      .grant('admin')
      .createAny('post')
      .deleteAny('post')
      .readAny('usuario')
      .deleteAny('usuario')


module.exports = controle