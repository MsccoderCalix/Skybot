let fs = require('fs')
let chalk = require('chalk')

module.exports = {
  name: 'status',
  alias: ['status'],
  category: 'other',
  desc: 'Pone un estado de whatsapp!',
  use: '<query>',
  async exec(msg, sock, args) {
    try{

    let fslist = null
     let  fsid = null
     let status = 
     ``
     if(args.length == 0)
     {
        fslist = fs.readFileSync(global.appRoot+'/Frases/bonita.txt').toString().split('\n')
        fsid = fslist[Math.floor(Math.random() * fslist.length)]
     }
           switch(args[0]) {
             case 'chess':
               if(args.length > 0)
                 fsid = chess
               else{
                 fslist = fs.readFileSync(global.appRoot+'/Frases/chess.txt').toString().split('\n')
                 fsid = fslist[Math.floor(Math.random() * fslist.length)] 
               }      
             break
       
             case 'chiste':
             fslist = fs.readFileSync(global.appRoot+'/Frases/chiste.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'curiosidad':
             fslist = fs.readFileSync(global.appRoot+'/Frases/curiosidad.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'educativo':
             fslist = fs.readFileSync(global.appRoot+'/Frases/educativo.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'bonita':
             fslist = fs.readFileSync(global.appRoot+'/Frases/bonita.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
     
             case 'celebre':
             fslist = fs.readFileSync(global.appRoot+'/Frases/celebre.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'msc':
             fslist = fs.readFileSync(global.appRoot+'/Frases/msc.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'funny':
               if(args.length > 1 && args[1]=='en'){
                 fslist = fs.readFileSync(global.appRoot+'/Frases/funnyen.txt').toString().split('\n')
                 fsid = fslist[Math.floor(Math.random() * fslist.length)]
               }
               else{
                 fslist = fs.readFileSync(global.appRoot+'/Frases/funnyes.txt').toString().split('\n')
                 fsid = fslist[Math.floor(Math.random() * fslist.length)]
               }
             break
       
             case 'ask':
             fslist = fs.readFileSync(global.appRoot+'/Frases/ask.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break
       
             case 'refran':
             fslist = fs.readFileSync(global.appRoot+'/Frases/refran.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]
             break 
       
             case 'anonymous':
             fslist = fs.readFileSync(global.appRoot+'/Frases/anonymous.txt').toString().split('\n')
             fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🕵️‍♀️'
             break  
         
             case 'texto':
             fslist = fs.readFileSync(global.appRoot+'/Frases/texto.txt').toString().split('\n')
             fsid = '🕊'+fslist[Math.floor(Math.random() * fslist.length)]+'📖'
             break 
         
             case 'motivar':
             fslist = fs.readFileSync(global.appRoot+'/Frases/motivar.txt').toString().split('\n')
             fsid = '🕊'+fslist[Math.floor(Math.random() * fslist.length)]+'🍀'
             break  
         
             case 'motivate':
             fslist = fs.readFileSync(global.appRoot+'/Frases/motivate.txt').toString().split('\n')
             fsid = '🕊'+fslist[Math.floor(Math.random() * fslist.length)]+'🍀'
             break    
          
             default:
               fsid= "No Data"
               break
         }
     
         status = '\n____________________\n_🍀'+fsid+'📝_\n_____________________\n*Atte:* _🤖Sky_\n'
     
       //await msg.reply('status@broadcast',status)// Poder combinar con otros comandos
       //sock.sendMessage('status@broadcast', {text: status})
       //await sock.sendMessage(msg.from,{text: "status", status: 2})

        


       //sock.sendMessage('status@broadcast', {status: "status"})


       await msg.reply('Done-Echo!')
       console.log(status)
     
       }  catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}