const { kompas } = require('@bochilteam/scraper')

module.exports = {
  name: 'kompas',
  category: 'information',
  desc: 'Buscando información en la brújula',
  async exec(msg, sock, args) {
    try {
      const res = await kompas()
      await msg.replyAd(JSON.stringify(res, null, 2), 'Kompas', 'Looking for information on kompas')
    } catch (e) {
      msg.reply(String(e))
    }
  }
}
