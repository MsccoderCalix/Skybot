module.exports = {
   name: 'delete',
   alias: ['del'],
   category: 'main',
   desc: 'Elimina el mensaje!',
   use: '<reply message>',
   async exec(msg, sock) {
      try {
         if (!msg.quoted.isSelf) return msg.reply('Responde al mensaje que desea eliminar')
         return msg.quoted.delete()
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}
      
