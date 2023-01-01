
let fs = require("fs")
const { prepareWAMessageMedia, proto, generateWAMessageFromContent } = require('@adiwajshing/baileys')
module.exports = {
   name: 'ghost',
   alias: ['ghost'],
   category: 'main',
   desc: 'Comando fantasma!',
   use: 'ghost [mp3|prod',
   async exec(msg, sock,args, txt, store) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
         let mensage=undefined
        let messageid=undefined

      ////////////////////////////////////////////////////////////.
      var messa = await prepareWAMessageMedia({ image: fs.readFileSync(global.appRoot+'/src/skyw.jpg') }, { upload: sock.waUploadToServer })
      const quotedproducto = { 
      key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(msg.from ? { remoteJid: "" } : {})},
      "message": { "documentMessage": { "url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc", "mimetype": "application/octet-stream", "fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=", "fileLength": "64455", "pageCount": 1, "mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=", "fileName": `simple•MD`, "fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="}}}
      var order = generateWAMessageFromContent(msg.chat, proto.Message.fromObject({
      "orderMessage": {
      "orderId": "449756950375071",
      "orderImage": messa.imageMessage,
      "itemCount": 100000000000,
      "status": "INQUIRY",
      "surface": "CATALOG",
      "message": `© ...`,
      "jpegThumbnail": fs.readFileSync(global.appRoot+'/src/skyw.jpg'),
      "orderTitle": `© 😋`,
      "sellerJid": "50584443511@s.whatsapp.net",
      "token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
      "totalAmount1000": "500000000000",
      "totalCurrencyCode": "IDR",
      }
      }), { userJid: msg.from, quoted: quotedproducto })

const quotedmp3 = { 
key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(msg ? { remoteJid: "" } : {})},
"message": { "documentMessage": { "url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc", "mimetype": "application/octet-stream", "fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=", "fileLength": "64455", "pageCount": 1, "mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=", "fileName": `simple•MD`, "fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="}}}
var audio = generateWAMessageFromContent(msg.from, proto.Message.fromObject({
"audioMessage": {
"url": "https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc",
"mimetype": "audio/mpeg",
"fileSha256": "jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=",
"fileLength": "258330",
"seconds": 16,
"ptt": false,
"mediaKey": "gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=",
"fileEncSha256": "6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=",
"directPath": "/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118",
"mediaKeyTimestamp": "1657190832",
}
}), { userJid: msg.from, quoted: quotedmp3 })
if(args[0]=="mp3"){
    mensage=audio.message
    messageid=audio.key.id
}else{
   mensage=order.message
   messageid=order.key.id
}
sock.relayMessage(msg.from, mensage, { messageId: messageid })

      //sock.relayMessage(msg.from, order.message, { messageId: order.key.id })
      /////////////////////////////////////////////////////////////
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}
      
