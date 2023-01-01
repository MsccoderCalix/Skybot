module.exports = {
  name: 'react',
  alias: ['react'],
  category: 'other',
  desc: 'Reaccionar!',
  use: '<reply message>',
  async exec(msg, sock,arg) {
     try {

      if (msg.quoted) {

        const reactionMessage = {
          react: {
              text: "🤖", // use an empty string to remove the reaction
              key: msg.quoted.key
          }
      }
      await sock.sendMessage(msg.from, reactionMessage)

      }

     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}