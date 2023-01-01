
module.exports = {
  name: 'online',
  alias: ['online'],
  category: 'ataques',
  desc: 'Ver personas en linea!',
  use: 'online',
  async exec(msg, sock,arg,args, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////
     let id = arg && /\d+\-\d+@g.us/.test(arg[0]) ? arg[0] : msg.from
     let online = store.chats.get(id).presences//[...Object.keys(store.chats.get(id).presences), store.user.id]
    //  msg.reply('List Online:\n' + online.map(v => '➸ @' + v.replace(/@.+/, '')).join`\n`, m, {
    //    contextInfo: { mentionedJid: online }
    //  })
    if(online != undefined)
     sock.sendMessage(msg.from, { text: 'List Online:\n' + online.map(v => '➸ @' + v.replace(/@.+/, '')).join`\n`, mentions: online }, { quoted: message })
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}