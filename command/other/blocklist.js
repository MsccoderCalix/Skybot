module.exports = {
  name: 'block',
  alias: [,'block','unblock'],
  category: 'other',
  desc: 'Administrar lista negra!',
  use: '<reply message>',
  async exec(msg, sock,arg,args) {
     try {
        ////////////////////////////////////////////////////////////

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()

        if(msg.mentions)
        {
          msg.mentions.forEach(element => {
            if(command == 'block')
             sock.updateBlockStatus(element, "block") // Block user
          if(command == 'unblock')
           sock.updateBlockStatus(element, "unblock") // Unblock user  
          });
        }

          //////////////
          if(msg.isGroup && msg.quoted)
          {
           if(!global.creador.includes(msg.quoted.participant))
            {
              if(command == 'block')
              await sock.updateBlockStatus(msg.quoted.participant, "block") // Block user
            if(command == 'unblock')
              await sock.updateBlockStatus(msg.quoted.participant, "unblock") // Unblock user             
            }           
          }
          //////////////////
          else if(!msg.isGroup)
          {
            if(command == 'block')
              await sock.updateBlockStatus(msg.from, "block") // Block user +'@s.whatsapp.net' 
          }
        
     //conn.reply(m.chat,"Done!-Hecho", m)
     console.log("Operacion realizada con exito!!")
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}
