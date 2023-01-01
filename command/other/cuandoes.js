module.exports = {
  name: 'cuando',
  alias: ['cuando', 'cuandoes', 'old', 'muerte'],//Cuando es?
  category: 'other',
  desc: 'Brujo adivina!',
  use: "'cuando <text>?', 'cuandoes <text>?', 'old @user', 'muerte @user'",
  async exec(msg, sock,arg,args,participants) {
     try {
        ////////////////////////////////////////////////////////////
        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()

        let txt = command == 'cuando'?'Cuando':'Cuando es'
        if(command == 'cuandoes' || command == 'cuando')
        {
          const respuesta=`
          *📢Pregunta:* ${txt} ${args}❓
          *🎎Respuesta⚠:* ${Math.floor(Math.random() * 10) + 1} ${pickRandom(['segundo', 'minuto', 'hora', 'día', 'semana', 'mes', 'año', 'década', 'siglo'])} 
          `.trim()

          sock.sendMessage(msg.from, {text:`
          *📢Pregunta:* ${txt} ${args}❓
          *🎎Respuesta⚠:* ${Math.floor(Math.random() * 10) + 1} ${pickRandom(['segundo', 'minuto', 'hora', 'día', 'semana', 'mes', 'año', 'década', 'siglo'])} 
          `.trim()})
        }
        
        if(command == 'old' || command == 'muerte')//old
        {
          let MtionedJid = [await msg.from]
        
          if(msg.quoted)
          {
            MtionedJid = [msg.quoted.participant]
          } 
          if(msg.mentions.length!=0)
          {
            MtionedJid = [msg.mentions[0]]
          }    
        
          let txt = `💀Hola @${MtionedJid[0].split('@')[0]}
          Después de un exhaustivo análisis
          de datos, basados es su
          información personal, cookies
          e historial de navegación.
          __________________________________
          *📢Usted Tendra:* _${pickRandom(['Muerte rápida',	'Muerte lenta o muerte agónica',	'Muerte natural o patológica',	'Muerte violenta',	'Muerte súbita, imprevista o inesperada',	'Muerte por inhibición',	'Muerte por inanición',	'Muerte sospechosa de criminalidad',	'Muerte real o somática',	'Muerte momentánea o transitoria',	'Muerte cerebral',	'Muerte clínica'])}_
          *☠Exactamente⚠:* _${Math.floor(Math.random() * 30) + 1} ${pickRandom(['día', 'semana', 'mes', 'año'])}_ `
        
          await sock.sendMessage(msg.from, { text: txt, mentions: MtionedJid })
        }
       //await sock.sendMessage(msg.from, reactionMessage)
    
       //{ text: '@12345678901', mentions: ['12345678901@s.whatsapp.net'] }

        ////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}