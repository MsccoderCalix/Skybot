module.exports = {
  name: 'leermas',
  alias: ['leermas'],
  category: 'ataque',
  desc: 'Truco leer mas!',
  use: '<>',
  async exec(msg, sock, args, txt, store) {
     try {

      const more = String.fromCharCode(8206)
      const readMore = more.repeat(4001)

  const argumento = msg.body.slice(msg.body.split(' ')[0].length,-1)

  let [ l, r ] = argumento.split(`|`)
  if (!l) l = ''
  if (!r) r = ''
  msg.reply(l + readMore + r, { quoted: msg})


     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}
     