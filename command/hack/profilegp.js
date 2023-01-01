let fs = require("fs");
module.exports = {
  name: 'hackgp',
  alias: ['hackgp','infogroup'],
  category: 'hack',
  desc: 'Obtener informacion del grupo!!',
  use: "'hackgp', 'infogroup'",
  async exec(msg, sock,args, txt, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

     let users = msg.sender
     const videos = getRandomInt(20,240)
     const fotos = getRandomInt(30,220)
     const musicas = getRandomInt(10,100)
     const audios = getRandomInt(20,200)
     const sms = getRandomInt(50, 140)
     const kkk = getRandomInt(3,69)
     const total = (videos + fotos + musicas + audios + sms)
     const fileLength= total*1000000
     const pageCount= (total*3.141592).toFixed(0)
 
     let cadena = '*Grupo:* _%nombre_\n'+
     '*Total Miembros:* _%numero_\n'+
     '*Descripcion:* %descripcion\n'+
     '--------------------------------\n'+
     '*Propietario:* \n %propietario \n\n'+
     '*Administradores:* \n%administradores'
     let cadena_hack = 
     '\n╭─--------------------------------\n'+
     '| *💾Base de Dato:* _si_\n'+
     '| *🎞Videos:* _%videos MB_\n'+
     '| *📸Fotos:* _%fotos MB_\n'+
     '| *🎧Musicas:* _%musicas MB_\n'+
     '| *🎙Audios:* _%audios MB_\n'+
     '| *✉SMS:* _%sms MB_\n'+
     '|--------------------------------\n'+
     '| *Total:* _%total MB_ \n'+
     '|--------------------------------\n'+
     '| _Se detecto un %kkk% de contenido_\n| _indesente en su contenido_\n'+
     '╰--------------------------------\n'
 
     cadena_hack = cadena_hack.replace(/%videos/g, videos).replace(/%fotos/g, fotos).replace(/%musicas/g, musicas).replace(/%audios/g,audios).replace(/%sms/g,sms).replace(/%total/g,total).replace(/%kkk/g,kkk)
     
     //isGroupMsg primitivo de conn
     const participantes = msg.isGroup ? groupMetadata.participants:''
     const groupId = msg.isGroup ? groupMetadata.id: ''
     const errorurl = './src/404.png'//Revisar que es esto
 // JSON'S 
 
     ///////////////////
     if(!msg.isGroup) 
       return conn.reply(msg.from, "Lo siento, este comando es valido solo en en _Grupos_", m)
 
     var totalMem = groupMetadata.participants.length//Total de particiàntes
     var descripcion = groupMetadata.desc//Informacion adicional: Investigar
     var groupname =  groupMetadata.subject//Nombre del grupo
     var gpOwner = typeof groupMetadata.owner !== 'undefined'?'➸ @'+groupMetadata.owner.split('@')[0] : "No definido"//typeof groupMetadata.owner !== 'undefined'?'@'+groupMetadata.owner.replace(/@c.us/g, ''):"No definido"
   
     let admgp = ''//Lista de administradores
     let listintegrantes =[]
 
     if(gpOwner != "No definido")
     listintegrantes.push(groupMetadata.owner.replace(/@c.us/g, '@s.whatsapp.net'))
       //listintegrantes.push(conn.getName(groupMetadata.owner.replace(/@c.us/g, '@s.whatsapp.net')))
 
     for (let integrante of participantes) 
       { 
         if(integrante.admin=="admin")
         {          
           admgp +=    '➸ @'+integrante.id.split('@')[0]+' \n'
           listintegrantes.push(integrante.id)
         }
                    
       }
      
     var grouppic = ''
     try{  grouppic =  await sock.profilePictureUrl(groupId)} catch{}
     var pfp = ''
 
     if (grouppic == undefined || grouppic == '') 
       {  pfp = errorurl } 
     else 
       {  pfp = grouppic }
     
     //await conn.sendFile(msg.chat, pfp, 'group.png', '', m)
 
     cadena = cadena.replace(/%nombre/g,   groupname).replace(/%numero/g, totalMem).replace(/%descripcion/g, descripcion).replace(/%propietario/g, gpOwner).replace(/%administradores/g, admgp)
     //await conn.sendFile(msg.chat, pfp, 'group.png', cadena, m)
     //var groupinfo =  `*${groupname}*\n\n*️👷 Miembros > ${totalMem}*\n\n*💌️ Welcome/Bye > ${welgrp}*\n\n*🌙 Anti-Porn > ${atpngy}*\n\n*🌏 Anti-Links > ${atlka}*\n\n*🎮 XP > ${xpgp}*\n\n*👤 Anti-Fakes > ${fakegp}*\n\n*🔏 Lista-negra > ${bklistgp}*\n\n*🔕 Mutado > ${slcegp}*\n\n*🎥 Auto-Stickers > ${autostk}*\n\n*🔞 Contenido adultos > ${ngrp}*\n\n*📃️ Descripción ↓*\n ${descripcion}\n\n*🌙 Propietario >* @${gpOwner}\n\n*☀️ Administradores ↓*\n${admgp}`
   
     if(command == "infogroup")
     sock.sendMessage(msg.from, { image: { url: pfp }, caption: cadena, mentions: listintegrantes}, { quoted: msg })
       
     else
     //sock.sendMessage(msg.from, { image: { url: pfp }, caption: cadena+cadena_hack, mentions: listintegrantes}, { quoted: msg })       
    sock.sendMessage(msg.from,
     { caption: cadena+cadena_hack, 
        document: fs.readFileSync(global.appRoot+'/src/skyw.jpg'), 
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        fileName: "Skybot_"+groupname.split(' ')[0], fileLength: fileLength, pageCount: pageCount, headerType: 'DOCUMENT',
        contextInfo: { externalAdReply: { title: groupname.split(' ')[0], body: 'Skybot@ᴠ6.6.6', 
      mediaType: 2, thumbnail: fs.readFileSync(global.appRoot+'/src/skyw.jpg'), showAdAttribution: true }},mentions: listintegrantes},{ quoted: msg })
    
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

