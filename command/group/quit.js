module.exports = {
  name: 'quit',
  alias: ['quit'],
  category: 'group',
  desc: 'Salir del grupo',
  use: 'quit',
  async exec(msg, sock,arg,args) {
     try {
      const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : ''
      const groupMembers = msg.isGroup ? await groupMetadata.participants : ''
      const groupSuperAdmin = msg.isGroup ? funciones.getGroupSuperAdmin(groupMembers) : ''
      const isBotSuperAdmin = groupSuperAdmin.includes(sock.user.id.split(':')[0]+'@s.whatsapp.net');

      if (!msg.isGroup) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR EN GRUPOS!!")
      //if (!isAdmins) return msg.reply("¡¡ESTE COMANDO SÓLO ES PARA ADMINISTRADORES!!")
      if (!isBotSuperAdmin) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR POR EL CREADOR DEL GRUPO!!")
     ////////////////////////////////////////////////////////////

     if(isBotSuperAdmin)
     {
      await sock.groupParticipantsUpdate(
        msg.from, 
        [msg.quoted.participant],
        "remove" // replace this parameter with "remove", "demote" or "promote"
      )
     }else if(global.creador.indexOf(msg.from) != -1 ){
      await sock.groupLeave(msg.from)
     }


        //await sock.groupLeave(msg.from) // (will throw error if it fails)
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}

