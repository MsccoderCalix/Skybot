let fs = require("fs");
module.exports = {
   name: 'owner',
   alias: ['creador','developer'],
   category: 'main',
   desc: 'Creador del bot',
   async exec(msg, sock, args, arg) {
      try {
         let users = '50588437704'
         let name = "∁∂∫ixto♛∨i∬∈g∂"
         fslist = fs.readFileSync('./Frases/anonymous.txt').toString().split('\n')
         fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🕵️‍♂️'
               
               type= "contactMessage"
               const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                     + 'VERSION:3.0\n' 
                     + `FN:${name}\n` // full name
                     + 'ORG:🤖Sky;\n' // the organization of the contact
                     + 'EMAIL:Sky_Service@Sky.com\n'//img_grupo_avatar.png
                     + `LABEL;TYPE=WORK,PREF:${fsid}\n`
                     + 'ADR;TYPE=HOME:;;Leon-Nicaragua🇳🇮;Estamos para servirte\n'
                     + `TEL;type=CELL;type=VOICE;waid=${users}:+${users}\n` // WhatsApp ID + phone number
                     + 'END:VCARD'
               content= {displayname: "🤖Sky", vcard: vcard}
   
   
         sock.sendMessage(
         msg.from,
           { 
              contacts: { 
               displayName: name, 
               contacts: [{ vcard }] 
              }
           }, { quoted: msg }
         )
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }


   }
}
