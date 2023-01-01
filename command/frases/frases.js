let fs = require("fs");
module.exports = {
   name: 'frase',
   alias: ['ask','bonita','funny','msc','refran','celebre','curiosidad','educativo','chiste','anonymous','texto','motivar','motivate','life','vida'],
   category: 'frases',
   desc: 'Muestra una frase!',
   async exec(msg, sock, args,body) {
      try {
        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
         switch(cmd) {
            case 'chiste':
            fslist = fs.readFileSync(global.appRoot+'/Frases/chiste.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'😄'
            break
      
            case 'curiosidad':
            fslist = fs.readFileSync(global.appRoot+'/Frases/curiosidad.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'‼'
            break
      
            case 'educativo':
            case 'frase':
            fslist = fs.readFileSync(global.appRoot+'/Frases/educativo.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'📝'
            break
      
            case 'bonita':
            fslist = fs.readFileSync(global.appRoot+'/Frases/bonita.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🌿'
            break
    
            case 'celebre':
            fslist = fs.readFileSync(global.appRoot+'/Frases/celebre.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'📚'
            break
      
            case 'msc':
            fslist = fs.readFileSync(global.appRoot+'/Frases/msc.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'📚'
            break
      
            case 'funny':
              if(args.length > 0 && args[0]=='en'){
                fslist = fs.readFileSync(global.appRoot+'/Frases/funnyen.txt').toString().split('\n')
                fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🙂'
              }
              else{
                fslist = fs.readFileSync(global.appRoot+'/Frases/funnyes.txt').toString().split('\n')
                fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🙂'
              }
            break
      
            case 'ask':
            fslist = fs.readFileSync(global.appRoot+'/Frases/ask.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'❓'
            break
      
            case 'refran':
            fslist = fs.readFileSync(global.appRoot+'/Frases/refran.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'📜'
            break 
          case 'anonymous':
            fslist = fs.readFileSync(global.appRoot+'/Frases/anonymous.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🕵️‍♂️'
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
          case 'life':
            fslist = fs.readFileSync(global.appRoot+'/Frases/life.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🌿'
            break
      
            case 'vida':
            fslist = fs.readFileSync(global.appRoot+'/Frases/vida.txt').toString().split('\n')
            fsid = fslist[Math.floor(Math.random() * fslist.length)]+'🌿'
            break     
            default:
              fsid= "No Data"
              break
        }

        msg.reply(`${fsid}`, { quoted: msg})
         console.log(fsid)

      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}
      
