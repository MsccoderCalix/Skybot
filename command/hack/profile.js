let funciones = require('../../lib/function/funciones')
const PhoneNumber = require('awesome-phonenumber')
let fs = require("fs");

module.exports = {
  name: 'profile',
  alias: ['profile','hack'],
  category: 'hack',
  desc: 'Obtener informacion del usuario!',
  use: "'profile @user','hack @user'",
  async exec(msg, sock,args, txt, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

    
     let MtionedJid = [msg.sender]
     if(msg.quoted)
       MtionedJid = [msg.quoted.participant]
     if(msg.mentionedJid) MtionedJid = [msg.mentionedJid[0]]
   
     let users = msg.isGroup?MtionedJid[0]:msg.from.replace('@c.us', '@s.whatsapp.net')//si grupo el que envia sino yo el del chat
     let status =  await sock.fetchStatus(users) //await conn.getStatus(users.replace('@s.whatsapp.net','@c.us'))//Estado de la persona
     let name = "name"//await conn.getName(users)//Nombre de la persona
     let ppUrl_defecto = global.appRoot+'/src/avatar_contact.png'
     let ppUrl = ''
     let pais = funciones.get_Pais_from_Numero('+'+users.split('@')[0])
   
     const sinleer = getRandomInt(3,25)
     const videos = getRandomInt(20,120)
     const fotos = getRandomInt(30,80)
     const musicas = getRandomInt(10,100)
     const audios = getRandomInt(10,60)
     const sms = getRandomInt(12,500)
     const kkk = getRandomInt(3,69)
     const total = (videos + fotos + musicas + audios + (sms)/1024).toFixed(2)
     const fileLength= total*1000000
     const pageCount= (total*3.141592).toFixed(0)

     let cadena = 
     '*Nombre:* _%nombre_\n'+
     '*Numero:* _%numero_\n'+
     '*Pais:* _%pais_\n'+
     '*Estado:* _%estado_\n'+
     '*Link:* _https://wa.me/%link_\n'
     let cadena_hack = 
     '\n╭─-------------------------------\n'+
     '| *💾Base de Dato:* _si_\n'+
     '| *📩SMS Sin Leer:* _%sinleer_\n'+
     '| *🎞Videos:* _%videos MB_\n'+
     '| *📸Fotos:* _%fotos MB_\n'+
     '| *🎧Musicas:* _%musicas MB_\n'+
     '| *🎙Audios:* _%audios MB_\n'+
     '| *✉SMS:* _%sms KB_\n'+
     '|--------------------------------\n'+
     '| *Total:* _%total MB_ \n'+
     '|--------------------------------\n'+
     '| _Se detecto un %kkk% de contenido_\n| _indesente en sus conversaciones_\n'+
     '╰--------------------------------\n'
   
     cadena_hack = cadena_hack.replace(/%sinleer/g, sinleer).replace(/%videos/g, videos).replace(/%fotos/g, fotos).replace(/%musicas/g, musicas).replace(/%audios/g,audios).replace(/%sms/g,sms).replace(/%total/g,total).replace(/%kkk/g,kkk)
   
           try{       
             ppUrl = await sock.profilePictureUrl(users, 'image')         
           }catch (e) {
       
           } finally {
             let usuario = users//await conn.contacts[users]
   
             if (ppUrl == undefined || ppUrl == '') 
             {  ppUrl = ppUrl_defecto } 
   
             if(command == 'hack')
               cadena += cadena_hack
   try {
    status == await sock.fetchStatus(users)//await conn.getStatus(usuario.jid.replace('@s.whatsapp.net','@c.us')) // leave empty to get your own status    
   } catch (error) {
    status="No_Data"
   }
             
             cadena = cadena.replace('%nombre',  "@"+usuario.split('@')[0]).replace('%numero', usuario.split('@')[0]).replace('%pais', pais).replace('%estado', status.status).replace('%link', usuario.split('@')[0])
         let mentionedJid = [users]

         if(command == 'profile')
          sock.sendMessage(msg.from, { image: { url: ppUrl }, caption: cadena, mentions: mentionedJid}, { quoted: msg }) 
          else         
         sock.sendMessage(msg.from,
          { caption: cadena, 
             document: fs.readFileSync(global.appRoot+'/src/skyw.jpg'), 
             mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
             fileName: "Skybot_"+usuario.split('@')[0], fileLength: fileLength, pageCount: pageCount, headerType: 'DOCUMENT',
             contextInfo: { externalAdReply: { title: "@"+usuario.split('@')[0], body: 'Skybot@ᴠ6.6.6', 
           mediaType: 2, thumbnail: fs.readFileSync(global.appRoot+'/src/skyw.jpg'), showAdAttribution: true }},mentions: mentionedJid},{ quoted: msg })
         }
     
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

    }
  }
 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

