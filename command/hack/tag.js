module.exports = {
   name: 'tag',
   alias: ['tag'],
   category: 'hack',
   desc: 'Anuncio de whatsapp',
   use: 'tag',
   async exec(msg, sock,arg,args, store) {
      try {
         if (!msg.key.fromMe) return msg.reply('¡Solo propietarios!')

         const msgtag = {
            "key": {
             "participants":"0@s.whatsapp.net",
               "remoteJid": "status@broadcast",
               "fromMe": false,
               "id": "Halo"
            },
            "message": {
               "contactMessage": {
                  "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
               }
            },
            "participant": "0@s.whatsapp.net"
         }
       // await sock.sendMessage(msg.from, listMessage, {quoted: fkontak})
         const groupMetadata = await sock.groupMetadata(msg.from)
         const participantes = await groupMetadata.participants
                
         let from = arg[0]?arg[0]:msg.from
         let allmem = []
         let integrantes=""
         let texto=
         `*❗Importante:*       
Hemos detectado tráfico que infringe nuestras políticas de seguridad en el grupo  
   ➸ [${groupMetadata.subject}]
debido al cifrado de extremo a extremo no podemos identificar los números de la infracción. *_WhatsApp se reserva el derecho a modificar, suspender, o cancelar del servicio por cualquier razón sin aviso previo y a su exclusiva discreción en las próximas 72 horas🧭_*
__________________________________ 
*para evitar esta accion envienos un correo📨:* support@support.whatsapp.com con el asunto: _forgiveness_ y en el cuerpo del mensaje su numero en formato internacional
__________________________________ 
¡Échale un vistazo a nuestro 
_Condiciones del servicio:_ https://www.whatsapp.com/legal/#terms-of-service
_Centro de ayuda!:_  https://faq.whatsapp.com/?l=es`
         
         // for (let usuario of participantes) {
         //    allmem.push(usuario.id)
         //    integrantes=integrantes+'➸ @'+usuario.id.split('@')[0]+' \n'       
           
         // }
         //texto=   texto.replace("#numeros#",integrantes)   
         sock.sendMessage(from, { text: texto, mentions: allmem }, { quoted: msgtag })
         
      } catch (error) {
         //msg.reply("‼✖Ocurrio un error⚠\nEs posible que el administrador del grupo lo configuro privado")
         console.log('Ocurrio un error\n'+error)
      }

   }
}
