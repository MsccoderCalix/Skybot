
let fs = require("fs");

module.exports = {
   name: 'b',
   alias: ['b'],
   category: 'main',
   desc: 'Comando base!',
   use: '<reply message>',
   async exec(msg, sock,args,txt, store) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
         

          //////////////////////////////////////////////////////////
            const { prepareWAMessageMedia, proto, generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
           
            var messa = await prepareWAMessageMedia({ image: fs.readFileSync(global.appRoot+'/src/profile.jpg') }, { upload: sock.waUploadToServer })
            const doc = { 
            key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(msg ? { remoteJid: "" } : {})},
            "message": { "documentMessage": {url: "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc", "mimetype": "application/octet-stream", "fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=", "fileLength": "64455", "pageCount": 1, "mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=", "fileName": `simple•MD`, "fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="}}}

var order = generateWAMessageFromContent(msg.from, proto.Message.fromObject({
"orderMessage": {
"orderId": "449756950375071",
"orderImage": messa.imageMessage,
"itemCount": 100000000000,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `© ...`,
"jpegThumbnail": fs.readFileSync(global.appRoot+'/src/profile.jpg'),
"orderTitle": `© 😋`,
"sellerJid": "593991398786@s.whatsapp.net",
"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
"totalAmount1000": "500000000000000",
"totalCurrencyCode": "IDR",
}
            }), { userJid: global.author, quoted: doc })

            // sock.sendMessage(msg.from, order.message, { messageId: order.key.id })
            sock.sendMessage(msg.from, { text: "texto" }, { quoted: order })
      /////////////////////////////////////////////////////////////
         } catch (error) {
            await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
            console.log('Ocurrio un error\n'+error)
            }
      

   }

}
      
