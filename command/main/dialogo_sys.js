const fs = require('fs');
const Path = require('path');
const { isNumber } = require('util');
const { string } = require('yargs');
let util = require('util')
const askreply = require('../../lib/function/askreply')  
const { throws } = require('assert');

module.exports = {
  name: 'dialogo_sys',
  alias: ['dialogo_sys'],
  category: 'main',
  desc: 'Respuestas automaticas!',
  use: 'Comando reservado',
  async exec(msg, sock, args, text, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////


     if(args.length == 0)
     throw 'Formato incorrecto'

     if(text.split("#%#")[1] == 'report' || text.split("#%#")[1] == 'reporte')
     {
       if(text.split("#%#")[1] == 'report') await sock.sendMessage(msg.from, { text: askreply.presentacion_en }, { quoted: msg })
       if(text.split("#%#")[1] == 'reporte') await sock.sendMessage(msg.from, { text: askreply.presentacion_es }, { quoted: msg })
       
       return
     }
   if(msg.isGroup && dialogogp_onoff)
     await sock.sendMessage(msg.from, { text: text.split("#%#")[1]+'.💬' }, { quoted: msg })    
   if(!msg.isGroup && dialogo_onoff)
     await sock.sendMessage(msg.from, { text: text.split("#%#")[1]+'.💬' }, { quoted: msg })

 
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}
  