
let fs = require("fs");
let { Chess } = require('chess.js')
//const axios = require('axios')

let fen = null
var array_pgn = null
var index_pgn = null
var pgn = null
let fslist = null
let  fsid = null

var map = {P: '♙',  B: '♝', N: '♞',  R: '♜',  Q: '♛',  K: '♚', p : '♟',  b: '♗', n: '♘',  r: '♖',  q: '♕',  k: '♔'};

const mapReplace = (str, map) => {
  const matchStr = Object.keys(map).join('|');
  if (!matchStr) return str;
  const regexp = new RegExp(matchStr, 'g');
  return str.replace(regexp, match => map[match]);
};

module.exports = {
  name: 'chess',
  alias: ['chess','chacii'],
  category: 'chess',
  desc: 'Ejercicios de ajedrez!',
  use: 'chess [open|medio|final|mate2]',
  async exec(msg, sock,arg,args) {
     try {
        ////////////////////////////////////////////////////////////

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()

        if(arg.length == 0)
        {
          fslist = fs.readFileSync('./Frases/chess.txt').toString().split('\n')
          fsid = '♕.'+fslist[Math.floor(Math.random() * fslist.length)]+'.♟'
          msg.reply(`${fsid}`)
          console.log(fsid)
          return
        }
    
        if(arg.length != 1 || ['open', 'medio', 'final', 'mate2'].indexOf(arg[0]) == -1)
        {
          await msg.reply('Formato invalido.\nIntente con: _.help '+command+'_')
          console.log('Formato invalido')
          return
        }
        //src/medio.pgn
        ///home/calixto/GitHub/Skybot/src/open.pgn
        //home/calixto/GitHub/Skybot/lib/message

        let chess = new Chess()     
        let url= global.appRoot+'/src/'+arg[0]+'.pgn'   
        //array_pgn =  fs.readFileSync(global.appRoot+'../../src/'+arg[0]+'.pgn').toString().split('\r\n-?-\r\n');
        array_pgn =  fs.readFileSync(url).toString().split('\r\n-?-\r\n');
    //console.log(array_pgn)
        index_pgn = Math.floor(Math.random() * array_pgn.length)//desde 0 hasta length
        pgn = array_pgn[index_pgn]
    
        if(['medio', 'final', 'mate2'].indexOf(arg[0]) != -1)
        {
          solucion = pgn.split('\r\n').slice(1,)//solucion
          chess.load(pgn.split('\r\n')[0].split('"')[1])//Load fen full
          fen = pgn.split('\r\n')[0].split('"')[1].split(' ')[0]//fen simplex
        }
        else//open
        {
          chess.load_pgn(pgn)//Load pgn full
          fen = chess.fen().split(' ')[0]//fen simplex
          solucion = pgn.split('\r\n').slice(9,)//solucion  revisar      
        }
        
       //Leyenda
        let tipo = (['medio', 'final'].indexOf(arg[0]) != -1)?'\n_Mejor Continuacion🔍_':'\n_Mate en 2🔍_'
        let turno = chess.turn() == 'w'?'*_♛Juegan Blancas♚_*\n':'*_♕Juegan Negras♔_*\n'
        let leyenda = turno + arg[0] + '-♘-' + index_pgn.toString() + tipo + global.bot_sky
    
        let txt_ascii = chess.ascii()
        
        if(command == 'chess')
        {
          //msg.reply(fen)
          const url = `http://www.fen-to-image.com/image/36/double/coords/${fen}`
    
          if(['medio', 'final', 'mate2'].indexOf(arg[0]) != -1)
            //await conn.sendFile(m.chat, url, 'chess.jpg', leyenda, m)

          await sock.sendMessage(
            msg.from, 
            { 
               image: { url: url},
               caption: leyenda                       
            },{ quoted: msg }
        )

          else//open
          {   
            chess.load_pgn(pgn)
    let leyenda_open =
    `*Apertura:*
        _${chess.header()['White']}_
    *Variante:*
        _${chess.header()['Black']}_
    ______________________________\n`  
  await sock.sendMessage(
    msg.from, 
    { 
       image: { url: url},
       caption:  leyenda_open + solucion + global.bot_sky                      
    },{ quoted: msg })
    
    //await sock.sendMessage(msg.from, { text: leyenda_open + solucion + global.bot_sky})     
  
          } 
    
        }    
        //await sock.sendMessage(msg.from, { text: leyenda_open + solucion + global.bot_sky})   
        console.log(txt_ascii + leyenda+command)
      
    

     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}