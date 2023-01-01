const djs = require("@discordjs/collection")
let funciones = require("../../lib/function/funciones")

module.exports = {
   name: 'add',
   alias: ['add'],
   category: 'group',
   desc: 'Agregar usuario al grupo',
   use: '<numero de telefono>\nEjemplo: /add 5058444xxxx',
   async exec(msg, sock, args) {
    try {
      
      const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
      const groupMembers =  msg.isGroup ? await groupMetadata.participants : []
      const groupAdmins =  msg.isGroup ? funciones.getGroupAdmins(groupMembers) : []
      const isAdmins =  groupAdmins.includes(msg.sender);
      const isBotAdmins =   groupAdmins.includes(sock.user.id.split(':')[0]+'@s.whatsapp.net');

      if (!msg.isGroup) return msg.reply("¡¡ESTE COMANDO SÓLO SE PUEDE UTILIZAR EN GRUPOS!!")
      if (!isAdmins) return msg.reply("¡¡ESTE COMANDO SÓLO ES PARA ADMINISTRADORES!!")
      if (!isBotAdmins) return msg.reply("¡¡NECESITO SER ADMINISTRADOR PARA QUE PUEDAS USAR ESTE COMANDO!!")

      if (args[0]) {
      // id & people to add to the group (will throw error if it fails)
      await sock.groupParticipantsUpdate(
        msg.from, 
        [args[0]+"@s.whatsapp.net"],
        "add" // replace this parameter with "remove", "demote" or "promote"
      )
      } else if (msg.quoted) {
      await sock.groupParticipantsUpdate(
        msg.from, 
        [msg.quoted.participant],
        "add" // replace this parameter with "remove", "demote" or "promote"
      )
      } else {
          msg.reply("Introduce el número o responde al mensaje!")
      }
    } catch (error) {
      msg.reply("‼✖Ocurrio un error⚠\nEs posible que el administrador del grupo lo configuro privado")
      console.log('Ocurrio un error\n'+error)
    }

   }
}

const getGroupAdmins = (participantes) => {
  try {
    var admins = []
    if(participantes === undefined)
    return []

    for (let i of participantes) {
       (i.admin === "admin" || i.admin === "superadmin") ? admins.push(i.id) : ''
    }
    return admins
  } catch (error) {
    return []
  }
}
