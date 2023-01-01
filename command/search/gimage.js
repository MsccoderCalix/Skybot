const bs = require("@bochilteam/scraper")

module.exports = {
   name: 'ggleimg',
   alias: ['ggleimg'],
   category: 'search',
   desc: 'Buscar imagenes en google',
   use: 'ggleimg <query>',
   async exec(msg, sock, args) {
    if (!args.join(" ")) return msg.reply("Introduzca la busqueda!")
      try {
         const res = await bs.googleImage(args.join(" "))
         const result = res[Math.floor(Math.random() * res.length)]
         sock.sendMessage(msg.from, { image: { url: result }, caption: result }, { quoted: msg })
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }
   }
}
