const djs = require("@discordjs/collection")

module.exports = {
   name: 'privado',
   desc: 'Cambiar el modo a modo privado (solo para el propietario)',
   category: 'owner',
   async exec(msg, sock, args) {
      if (!msg.key.fromMe) return msg.reply('¡Solo propietarios!')
      if (djs.mode === "privado") return msg.reply('¡Ya esta en modo privado!')
      djs.mode = "privado"
      msg.replyAd('Éxito cambió el modo a privado👌', 'Bot ahora solo se puede usar para el propietario')
   }
} 