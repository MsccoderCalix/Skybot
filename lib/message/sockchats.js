const {serialize}  = require(global.appRoot +"/lib/function/helper.js")
let funciones = require(global.appRoot +"/lib/function/funciones")
const { exec, spawn } = require("child_process")
const axios = require('axios')
const fetch = require('node-fetch')
const util = require('util')
const moment = require("moment-timezone")
const fs = require("fs")
const djs = require("@discordjs/collection");
let path = require('path')
let removeAccents = require('remove-accents')
let chalk = require('chalk')
let {downloadMediaMessage}= require('@adiwajshing/baileys')

djs.mode = "privado"

module.exports = async (sock, m, store) => {
	try {
	    if (m.type !== "notify") return
        let msg = serialize(JSON.parse(JSON.stringify(m.messages[0])), sock)
        if (!msg.message) return
        if (msg.key && msg.key.remoteJid === "status@broadcast"){
           let status= `Se recivio un Status:
          Sender: ${chalk.blue(msg.sender)}
          Vname: ${chalk.redBright(msg.pushName)}`
          console.log(status)

            return
        }
        if (msg.type === "reactionMessage" ){
            
            let reactionMessage= `Se recivio un reactionMessage:
            Sender: ${chalk.blue(msg.sender)}
            From: ${chalk.blue(msg.from)}
            Vname: ${chalk.redBright(msg.pushName)}
            Emoji: ${chalk.redBright(msg.body)}`
            console.log(reactionMessage)

            return
        }

        if (msg.type === "protocolMessage" || msg.type === "senderKeyDistributionMessage" || !msg.type || msg.type === "") return
        
        // auto read & online
        //sock.sendReadReceipt(msg.from, msg.sender, [msg.key.id])
        sock.sendPresenceUpdate('available', msg.from)

        let { body, isGroup, isPrivate, sender, from, pushName } = msg
       
        //#region  VIEWONCE
        
        let viewOnce= false
        let viewOnce_type= undefined

        if(msg.message.imageMessage !== undefined){
            viewOnce=msg.message.imageMessage.viewOnce
            viewOnce_type=msg.message.imageMessage.mimetype
        }

        if(msg.message.videoMessage !== undefined){
            viewOnce=msg.message.videoMessage.viewOnce
            viewOnce_type=msg.message.videoMessage.mimetype
        }

        if (viewOnce){
            const buffer = await downloadMediaMessage(msg,'buffer',{ },{reuploadRequest: sock.updateMediaMessage})

            if(viewOnce_type == "image/jpeg")
            sock.sendMessage(msg.from, { image: buffer,mimetype: viewOnce_type}, { quoted: msg }) 
            if(viewOnce_type == "video/mp4")
            sock.sendMessage(msg.from, { video: buffer,mimetype: viewOnce_type}, { quoted: msg }) 

        }
//#endregion

        //VALIDAR CUERPO DEL MENSAJE
         //Validar audio
        if (msg.type == 'audioMessage')
        {
            if(!msg.isGroup && dialogo_onoff && global.owner.indexOf(sender) == -1)
            {
            //await sock.sendMessage(msg.from,{ audio: { url: global.responder_EsEn }, mimetype: 'audio/mp4', ptt: true})
            console.log(chalk.red(msg.sender),' Se recibio un: ', chalk.blue(msg.type))
            }
            return
        }
         //Fin validar audio  

         //validar cuerpo sms
         body = removeAccents(body)//Revisar
         let auditar= funciones.validarmensaje(body)

         switch(auditar.split(" ")[0]) {
            case 'LINKWHATSAPP':
                if (msg.isGroup) {
                  msg.reply("🚫 *_Cuidado_* 🆘\nLink de grupo detectado...")
                  console.log(color('[BAN]', 'red'), color('Link de grupo detectado, removiendo participante...', 'yellow'))
                
                //await conn.groupRemove(m.chat, [m.sender])
                //await conn.blockUser (m.sender, "add") // Block user
                //await conn.modifyChat (m.sender, 'delete')
                return
                }
            break
            case 'URL':                
                //await conn.groupRemove(m.chat, [m.sender])
                msg.reply("🚫 *_Cuidado_* 🆘\nSe detecto un _Link_")
                console.log(chalk.red('[BAN]'), chalk('Se detecto un _Link_',"yellow"))
            return
            
            case 'RISA':
                await sock.sendMessage(msg.from,{ audio: { url: global.appRoot+'/src/Risa_Diabolica.opus'}, mimetype: 'audio/mp4', ptt: true})
            return                
            case 'TRABA':
                await sock.sendMessage(msg.from, { delete: msg.key })
                if (msg.isGroup) {
                    msg.reply("🚫 *_Cuidado_* 🆘\nSe detecto un _MENSAJE TRABA_")
                    //await sock.reply("❌Defensa anti trabas!!!\nSi esto no es una traba @"+ msg.sender.split('@')[0] +" comuniquese con los administradores🕵️‍♀️")
                    //await conn.groupRemove(msg.from.chat, [msg.sender])
                    //await sock.updateBlockStatus(msg.sender, "block") // Block user        
                }
                else
                    await sock.sendMessage(msg.from, { delete: msg.key })
                console.log(chalk('[TRABA DETECTADA]', 'red'))
                return
            
            case '.mpalabra_sys':
            case '.dialogo_sys':
                body= auditar
                msg.body= auditar
            break

            default:
                body= body//nada
              break
        }

        //Fin validar cuerpo sms
        
        const time = moment(Date.now()).tz('America/Managua').locale('id').format('HH:mm:ss')
        const ucap = "Hola "+moment(Date.now()).tz('America/Managua').locale('id').format('a')
        //const mprefix = new RegExp('^[' + '!#$%&?/;:,.<>~-+='.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
        const prefix = "."//mprefix.test(body) ? body.split('').shift() : '/'
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const isOwner = global.owner.includes(sender)
        
        //.shift()= The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.
        //.slice()= The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
        const cmdName = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const cmd = djs.commands.get(cmdName) || djs.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
        

        if (!isCmd && djs.mode === "privado" && !isOwner && !from.includes("120363047089819477@g.us"))
            return        
  
        if (isCmd) {
            console.log("[Mensaje recivido]\n• Hora : ", chalk.redBright(time), "\n• Comando : ", chalk.green(body), "\n• Desde : ", chalk.yellow(sender))
        }
        else{
            console.log("[Mensaje recivido]\n• Hora : ", chalk.redBright(time), "\n• Mensaje : ", chalk.green(body), "\n• Desde : ", chalk.yellow(sender))
            
            if(!isGroup && dialogo_onoff && global.owner.indexOf(sender) == -1)
            {
              let usrjid = '@' + msg.from.split('@')[0]            
              await sock.sendMessage(msg.from, { text: funciones.respuesta_defecto().replace('%usuario', usrjid), mentions: [msg.from] },{ quoted: msg })
              return  
            }
            return
        }
        
        if (!cmd) return
        
        try {
            cmd.exec(msg, sock, args, arg, store);
          } catch (e) {
                console.error("[CMD ERROR] ", e);
             }
        } catch (e) {
        	console.log("[CHATS ERROR] ", String(e))
     }
}
