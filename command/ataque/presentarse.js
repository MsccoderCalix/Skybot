const askreply = require('../../lib/function/askreply'); 

module.exports = {
  name: 'reporte',
  alias: ['reporte','report'],
  category: 'ataque',
  desc: 'Lista de requisitos!',
  use: 'reporte',
  async exec(msg, sock,arg, args, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////


     let MtionedJid = [msg.sender]

     if(msg.quoted)
      MtionedJid = [msg.quoted.participant]
   
     if(msg.mentions) 
      MtionedJid = msg.mentions
   
   let nuevo_integrante = '🙂Hola\n'
   let cadena = ''
       if(MtionedJid.length > 0)
       {
         for (let integrante of MtionedJid)
           { 
             cadena = integrante.split('@')[0]
             nuevo_integrante += "➸ @"+ cadena+" \n"
           }
         if(command == 'reporte')
         await sock.sendMessage(msg.from, { text: nuevo_integrante + '____________________________\n' + askreply.presentacion_es, mentions: MtionedJid }, { quoted: msg })
         if(command == 'report')
         await sock.sendMessage(msg.from, { text: nuevo_integrante + '____________________________\n' + askreply.presentacion_en, mentions: MtionedJid }, { quoted: msg })     
       }
       else{
         if(command == 'reporte')
         await msg.reply(askreply.presentacion_es)
       if(command == 'report')
         await msg.reply(askreply.presentacion_en)
       }
   
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        //await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}

