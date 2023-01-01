
module.exports = {
  name: 'oficial',
  alias: ['oficial'],
  category: 'hack',
  desc: 'Mensaje oficial de whatsapp',
  use: 'oficial <texto>',
  async exec(msg, sock,args,text) {
     try {

     ////////////////////////////////////////////////////////////
     sock.sendMessage("0@c.us", {text: text})//Anuncios Oficiales
     sock.sendMessage("0@s.whatsapp.net", {text: text})//Anuncios Oficiales
     console.log("Anuncios Oficiales= 0@c.us\n"+text)
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}