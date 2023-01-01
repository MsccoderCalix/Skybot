
module.exports = {
  name: 'gplist',
  alias: ['gplist','gid'],
  category: 'group',
  desc: 'Mostrar los grupos agregados!',
  use: "'grouplist', 'gid'",
  async exec(msg, sock,arg,args, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

     if(command == 'gplist')
     {
      let grupos=  store.chats.array.filter(v => v.id.endsWith('g.us'))
      // filter(v => v.jid.endsWith('g.us')).map(v =>`${conn.getName(v.jid)}\n${v.jid} [${v.readOnly ? 'Left' : 'Joined'}]`).join`\n\n`
      let txt = grupos.map(v =>`${v.id}\n${v.name} [${v.readOnly ? 'Left' : 'Joined'}]`).join`\n\n`
       msg.reply('Lista de Grupos:\n' + txt)
     }
     if(command == 'gid')
     {
      sock.sendMessage(global.creador[0], { text: `*${groupMetadata.subject}:*\n${msg.from}` }, { quoted: msg })
       //msg.reply('Done!-Echo')
       console.log(`Done!-Echo\n\n*${groupMetadata.subject}:*\n${msg.from}`)
     }
     
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}