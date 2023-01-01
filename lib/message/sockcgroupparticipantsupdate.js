
const isHistoryMsg = require("@adiwajshing/baileys")
const fs = require("fs")

module.exports = async (sock, group_participants_update) => {
    try{
        if(group_participants_update.action !== "add" || global.mode == "privado")
          {
            //sock.sendMessage(group_participants_update.id, { text: "salida"})
            return
          }
          
        //const askreply = require('/askreply'); 
        let fslist = fs.readFileSync(global.appRoot+'/Frases/bonita.txt').toString().split('\n')
        let fsid = fslist[Math.floor(Math.random() * fslist.length)]
        let frase_pie =   '\n\n______________________________\n_🍀'+fsid+'🌴_\n______________________________\n*Atte:* _🤖Sky_\n'
      
      let bienvenida = "*🙂Hola*\n"+
      " %integrante\n"+
      "➸Te damos una cordial bienvenida\n"+
      "➸Soy *🤖Sky* asistente de WhatsApp\n"+
      "➸De parte del Grupo y todos sus integrantes👨‍👨‍👦‍👦"+
      "deseamos que se divierta y sea de su agrado.\n\n"+
      "1⃣Te recomiendo que leas la descripción del grupo.\n\n"+
      "2⃣Para mas informacion digite: .help" + frase_pie
    
      let nuevo_integrante = ''
      if(group_participants_update.participants.length > 1)
      {
        for (let integrante of group_participants_update.participants)
          { 
            cadena = integrante.split('@')[0]
            nuevo_integrante += "➸ @"+ cadena+" \n"
          }
          bienvenida = bienvenida.replace('➸Te damos', '➸Que tengan')
      }
      if(group_participants_update.participants.length == 1)
      {
        if(group_participants_update.participants[0] == global.creador[0])
        {
          bienvenida = 
          `Hola Soy *_🤖Sky_* Asistente virtual de respuestas automáticas\nGracias por hacerme parte de este grupo. Espero divertirme y que utedes se sientan orgullosos de mi presencia
          1⃣Para mas informacion digite: .help` + frase_pie
          welcome_txt = ''
        }
        else
        {
          nuevo_integrante = '@'+group_participants_update.participants[0].split('@')[0]//bienvenida.replace("%integrante",'@'+group_participants_update.participants[0].split('@')[0]) //.replace("%grupo", groupMetadata.subject)
          welcome_txt = group_participants_update.participants[0]
        }
      }
        
        bienvenida = bienvenida.replace("%integrante", nuevo_integrante)
        sock.sendMessage(group_participants_update.id, { text: bienvenida, mentions: group_participants_update.participants })
        // conn.reply(group_participants_update.jid, bienvenida, null, {contextInfo: { mentionedJid:  group_participants_update.participants }})
      }
      catch (error) { 		
            console.log('Se obtuvo un error\n'+error)
        }
}
