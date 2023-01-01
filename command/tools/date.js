
module.exports = {
  name: 'date',
  alias: ['date'],
  category: 'main',
  desc: 'Obtener la fecha actual',
  use: 'date',
  async exec(msg, sock,arg,args) {
     try {
     ////////////////////////////////////////////////////////////
     msg.reply(`${new Date()}`, { quoted: msg})
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}

