
const { downloadMediaMessage } = require('@adiwajshing/baileys')
const fs = require('fs')
const { Sticker, StickerTypes } = require('wa-sticker-formatter')
// import { downloadMediaMessage } from '@adiwajshing/baileys'

module.exports = {
    name: 'stiker',
    alias: ['stiker','stik'],
    category: 'tools',
    desc: 'Crear sticker desde imagen!',
    use: 'stiker (caption|reply media)',
    async exec(msg, sock,args, txt, store) {
       try {
          ////////////////////////////////////////////////////////////
          const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
          const groupMembers =  msg.isGroup ? await groupMetadata.participants : []
 
          const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
          
       ////////////////////////////////////////////////////////////

        
       let pack = '∁∂∫ixto♛∨i∬∈g∂'
       let img= undefined
        

       switch(command) {
           case 'stiker':
            const messageType = msg.quoted.mtype
            if (messageType === 'imageMessage') {
                img = await downloadMediaMessage(msg.quoted,'buffer',{ },
                    { 
                        reuploadRequest: sock.updateMediaMessage
                    }
                )
            }   
           break
                   
           case 'stik':  
           //usuario                              
               let users = !msg.isGroup?msg.from:msg.quoted ? msg.quoted.participant:groupMetadata.id
           //package

               if(msg.isGroup)                    
               {
                   pack= groupMetadata.subject                   
               }
               pack=  msg.isGroup && msg.quoted ? msg.quoted.sender:groupMetadata.id ? groupMetadata.subject:pack
               
               if(!msg.isGroup || msg.quoted)
               {
                   let usuario = "usuario"//await store.contacts[users]
                   pack=  args[0] || '∁∂∫ixto♛∨i∬∈g∂'                    
                //    pack=  args[0] || usuario.vname || usuario.verify || usuario.notify || usuario.name || '∁∂∫ixto♛∨i∬∈g∂'                    
               }
                               
               img = await sock.profilePictureUrl(users,'image') 
            //    const ppUrl = await sock.profilePictureUrl("xyz@g.us")
           break

           default:
               throw 'Formato invalido' 
       }

   if (!img) throw 'No hay imagen para transformar'

   const sticker = new Sticker(img, {
       pack: `${pack}`, // The pack name
       author: '🤖Sky', // The author name
       type: StickerTypes.FULL, // The sticker type
       categories: ['🤖', '🎉'], // The sticker category
       id: '666', // The sticker id
       quality: 50, // The quality of the output file
       background: '#000000' // The sticker background color (only for full stickers)
   })

   const buff = await sticker.toBuffer()

    // msg.reply(msg.from, await sticker.toMessage(), { quoted: msg })  

    await sock.sendMessage(
        msg.from, 
        { 
        sticker: buff,
        caption: '🤖Sky'                   
        }, { quoted: msg }
    )


       /////////////////////////////////////////////////////////////
       } catch (error) {
          await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
          console.log('Ocurrio un error\n'+error)
       }
 
    }
 }
       
