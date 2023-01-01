module.exports = {
  name: 'anunciar',
  alias: ['anunciar'],
  category: 'group',
  desc: 'Realiza mensage grupal!',
  use: '<reply message>',
  async exec(msg, sock,arg,args) {
     try {
        ////////////////////////////////////////////////////////////
        if (!msg.isGroup) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR EN GRUPOS!!")
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const participants =  msg.isGroup ? await groupMetadata.participants : []
        
        ////////////////////////////////////////////////////////////
        if(arg.length == 0)
        throw 'Formato invalido'
        let comunicado = 
        "*🗣Se les comunica*\n👉"+args+
        "💬\n\n_A los siguientes Integrantes:_\n"+
        "%integrantes"+
        "______________________________\n"+
        "Muchas Gracias *Atte:* _🤖Sky_"
        
        let users = participants.map(u => u.id)
        let todos = ''
        for (let integrante of participants) 
        { 
        if(!global.owner.includes(integrante.id))
        todos +=    '➸ @'+integrante.id.split('@')[0]+' \n'           
        }
        
        comunicado = comunicado.replace("%integrantes", todos)
        
        //await conn.reply(m.chat, comunicado, m, { contextInfo: { mentionedJid: users } })
        await sock.sendMessage(msg.from, { text: comunicado, mentions: users },{ quoted: msg })
         
        /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}