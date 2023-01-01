const djs = require("@discordjs/collection")

module.exports = {
   name: 'publico',
   desc: 'Cambiar el modo a público (para todos los usuarios)',
   category: 'owner',
   async exec(msg, sock, args) {
      if (!msg.key.fromMe) return msg.reply('¡Solo propietarios!')
      if (djs.mode === "publico") return msg.reply('¡Ya esta en modo público!')
      djs.mode = "publico"
      msg.replyAd('Éxito al cambiar el modo a público👌', 'El bot ahora se puede usar para todos los usuarios')
   }
} 
