let fs = require("fs");
let { MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")
let { Chess } = require('chess.js')

let fen = null
let solucion = null
var array_pgn = null
var index_pgn = null
var archivo_variante = null

var map = {P: '♙',  B: '♝', N: '♞',  R: '♜',  Q: '♛',  K: '♚', p : '♟',  b: '♗', n: '♘',  r: '♖',  q: '♕',  k: '♔'};

const mapReplace = (str, map) => {
  const matchStr = Object.keys(map).join('|');
  if (!matchStr) return str;
  const regexp = new RegExp(matchStr, 'g');
  return str.replace(regexp, match => map[match]);
};

function validar_archivo_index(arc_variante, ind_pgn)
{
    if(['open', 'medio', 'final', 'mate2'].indexOf(arc_variante) == -1 || !Number.isInteger(parseInt(ind_pgn,10)))
      return false

    index_pgn = parseInt(ind_pgn,10)
    array_pgn =  fs.readFileSync(global.appRoot+'/src/'+arc_variante+'.pgn').toString().split('\r\n-?-\r\n');  
        //Verificar index entre indice del arcvivo
    if(array_pgn.length < index_pgn || index_pgn < 0)
      return false
      
  return true
}

module.exports = {
   name: 'solver',
   alias: ['solver'],
   category: 'chess',
   desc: 'Comando base!',
   use: "solver <medio|final|mate2> <index>', 'solver <Caption>",
   async exec(msg, sock,args) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()

      ////////////////////////////////////////////////////////////

   
      if(msg.quoted)//Primero reviso si quoted
      {
          archivo_variante = msg.quoted.text.split('\n')[1].split('-♘-')[0].toLowerCase()
          index_pgn =  msg.quoted.text.split('\n')[1].split('-♘-')[1] //parseInt(m.quoted.text.split('\n')[1].split('-♘-')[1],10)
      }
      else
      {
        if(args.length == 2 && ['medio', 'final', 'mate2'].indexOf(args[0]) != -1) //Si 2 parametros y validos
        {
          archivo_variante = args[0].toLowerCase()
          index_pgn = args[1]
        }
      }
  
      if(!validar_archivo_index(archivo_variante, index_pgn))
      {
        await msg.reply('Formato invalido.\nIntente con: _.help '+command+'_', { quoted: msg})
        console.log('Formato invalido')
        return
      }
      
      let chess = new Chess()
        fen = array_pgn[index_pgn].split('\r\n')[0].split('"')[1].split(` `)[0]//fen
        solucion = array_pgn[index_pgn].split('\r\n').slice(1,)//solucions
  
      //Leyenda
  
      let leyenda = '*Solucion:*\n______________________________\n' + solucion +'\n______________________________\n_[R: ♖, B: ♗, N: ♘, Q: ♕, K: ♔, P: ♟]_'+ global.bot_sky
      const url = `http://www.fen-to-image.com/image/36/double/coords/${fen}`
  
      await sock.sendMessage(
        msg.from, 
        { 
           image: { url: url},
           caption:  leyenda                     
        },{ quoted: msg })

      console.log(leyenda + command)
    
      /////////////////////////////////////////////////////////////
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}