let handler  = async (m, { conn, command, args, }) => {  
let respuesta = ''
let src = global.appRoot + '/src/frontal/'
const fs = require('fs');
const Path = require('path');
const CryptoJS = require('crypto');

let mention = null
let database_store = 'msgstore-'+(new Date()).getFullYear() + '-' + (new Date()).getMonth() + 1 + '-' +  (new Date()).getDate()+'.db.crypt14'

if(m.mentionedJid.length == 0 && m.quoted == null && m.isGroup)
  throw 'Formato invalido'

if(m.mentionedJid)
 mention = [m.mentionedJid[0]]

if(m.quoted)
 mention = [m.quoted.sender.split('@')[0] + '@s.whatsapp.net']

mention = !(m.isGroup)?[m.chat.split('@')[0] + '@s.whatsapp.net']: mention

  try{

      switch(command) {
        case 'frontal': 
          if(!m.fromMe)
            respuesta = "*❌Error!* \nComando reservado exclusivo para uso oficial\n\n*‼Advertencia🆘*\n_[👮‍♀️El uso indebido de esta herramienta puede incurrir en delito federal👮‍♀️]_"
         else
         {
          src += 'frontal_ ('+getRandomInt(1, 13)+').jpg'//hasta el total de fotos          
          respuesta = `
*Nombre:* @${mention[0].split('@')[0]}
*Fecha foto:* _${new Date()}_`
         }

        break        
        case 'getchat':
          if(!m.fromMe)
            respuesta = "*❌Error!* \nComando reservado exclusivo para uso oficial\n\n*‼Advertencia🆘*\n_[👮‍♀️El uso indebido de esta herramienta puede incurrir en delito federal👮‍♀️]_"
        else
        {
          respuesta = `
_💾Se encontro ${getRandomInt(1, 11)} archivo de_
_respaldo_
*Propietario:* @${mention[0].split('@')[0]}
*Mas reciente:*
_[${database_store}]_
*Peso:* _${getRandomInt(20,400)}_ MB
______________________________
_Los datos fueron enviados al portal_
*Pass:* _${CryptoJS.randomBytes(10)}_`
        }                        
        break

        case 'chatcon':
          const estado = getRandomInt(0,30)
          const perfil = getRandomInt(0,9)
          const interaccion = getRandomInt(0,15)
         
          if(m.mentionedJid.length != 2 && args.length != 2 )
            respuesta =  "*Error!* \nFormato incorrecto"
          else
            respuesta = `🔎Revision de estados📸: ${estado}%\n🧕Revision de perfill🤵: ${perfil}%\n🏌️‍♀️Interaccion general🚻: ${interaccion}%\n\n_[No pude detectar intercambio de mensajes porque alguno de los usuarios posee su perfil configurado privado]_\n*‼Advertencia🆘*\n_[👮‍♀️El uso indebido de esta herramienta puede incurrir en delito federal👮‍♀️]_`
        break
           
        default:
            throw 'Formato invalido' 
          break
    }
   if(command == 'frontal')
     await conn.sendFile(m.chat, src, 'frontal.jpg', respuesta, m, false,  { contextInfo: { mentionedJid: mention } }) 
  else
   await conn.reply(m.chat,respuesta, m,  { contextInfo: { mentionedJid: mention } })

  console.log('Echo')

} catch (error) { 
  await conn.reply(m.chat, '‼✖Formato invalido⚠', m)
  console.log('Ocurrio un error\n'+error)
}
}
handler.help = ['frontal @user', 'getchat @user', 'chatcon @user1 @user2']
handler.tags = ['ataque']
handler.command = /^(frontal|getchat|chatcon)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

let fs = require('fs')
const { isNumber } = require('util')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
