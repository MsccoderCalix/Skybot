
module.exports = {
   name: 'getdata',
   alias: ['getdata'],
   category: 'ataque',
   desc: 'Obtener metadatos!',
   use: 'getdata xxx',
   async exec(msg, sock, args, txt, store) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
         
      ////////////////////////////////////////////////////////////
      if(txt!= undefined){
         const response = await sock.groupGetInviteInfo(txt)
         msg.reply(response)
         console.log("group information: " + response)
      }
      /////////////////////////////////////////////////////////////
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}
      
