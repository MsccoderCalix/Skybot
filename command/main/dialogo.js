const fs = require('fs');
const Path = require('path');
const { isNumber } = require('util');
const { string } = require('yargs');
let util = require('util')
const askreply = require('../../lib/function/askreply'); 


module.exports = {
  name: 'dialogo',
  alias: ['dialogo [on|off]','dialogogp [on|off]'],
  category: 'main',
  desc: 'Activar o desactivar dialogo del bot en grupos o chats personales!',
  use: 'dialogo [on|off], dialogogp [on|off]',
  async exec(msg, sock,args, txt, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////


     if(args.length == 0)
     {
       await msg.reply('No comprendo tu peticion\nRevisar documentacion')
       return
     }
 
     if(args[0] == 'on' || args[0] == 'off')
     {
       if(command == 'dialogo')
       {      
         if (args[0] == 'on') global.dialogo_onoff = true
         if (args[0] == 'off') global.dialogo_onoff = false
       }
 
       if(command == 'dialogogp')
       {      
         if (args[0] == 'on') global.dialogogp_onoff = true
         if (args[0] == 'off') global.dialogogp_onoff = false
       }
 
       await msg.reply('Done!-Echo')
       return
     }
 
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}