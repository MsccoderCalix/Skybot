
let fs = require("fs")
const { prepareWAMessageMedia, proto, generateWAMessageFromContent } = require('@adiwajshing/baileys')
module.exports = {
   name: 'a',
   alias: ['a'],
   category: 'main',
   desc: 'Comando base!',
   use: '<reply message>',
   async exec(msg, sock,args, txt, store) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
      ////////////////////////////////////////////////////////////.
     
      sock.sendMessage("status@broadcast", { text: " 50664060139@s.whatsapp.net" })
      
      /////////////////////////////////////////////////////////////
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}
      
