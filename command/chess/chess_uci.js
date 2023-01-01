let fs = require("fs");
let { Chess } = require('chess.js')
let { MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys")

let fen = null
var array_pgn = null
var url = null
let bestMove = null
let leyenda = null
let i = null //MOVIMIENTOS DE VARIANTE
var index_pgn = null
var archivo_variante = null
var engine = null
var engine_aux = null


function validar_archivo_index(arc_variante, ind_pgn)
{
  if(arc_variante == null || ind_pgn == null)  return false

  if(['open', 'medio', 'final', 'mate2'].indexOf(arc_variante) == -1 || !Number.isInteger(parseInt(ind_pgn,10)))
     return false

    index_pgn = parseInt(ind_pgn,10)
    array_pgn =  fs.readFileSync(global.appRoot+'/src/'+arc_variante+'.pgn').toString().split('\r\n-?-\r\n');

    if(array_pgn.length < index_pgn || index_pgn < 0)
      return false
  
  fen = array_pgn[index_pgn].split('\r\n')[0].split('"')[1]//Fen completo  
  return true
}


module.exports = {
   name: 'uci',
   alias: ['uci', 'uciimg'],
   category: 'chess',
   desc: 'Comando base!',
   use: "'uci <fen>', 'uciimg <fen>'",
   async exec(msg, sock,args,text) {
      try {
         ////////////////////////////////////////////////////////////
         const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
         const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

         const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()

      ////////////////////////////////////////////////////////////

      let stockfish = require('stockfish')    
      let chess = new Chess()
      if(engine_aux == null)
        engine_aux = stockfish()//Verificar
  
        engine = engine_aux
        if(engine == engine_aux)
          console.log('igual')
      
      leyenda = ''
      i = 1
      
      fen = text// por defecto fen lleva el parametro    
      if(msg.quoted && fen == '')//Primero reviso si quoted
      {
          archivo_variante = m.quoted.text.split('\n')[1].split('-♘-')[0].toLowerCase()
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
      
      if(validar_archivo_index(archivo_variante, index_pgn))//Si bien
        fen = array_pgn[index_pgn].split('\r\n')[0].split('"')[1]//Cargo
  
      if(!chess.validate_fen(fen).valid)
      {
        await msg.reply('Fen invalido.⚠\nIntente con: _.help '+command+'_', { quoted: msg})
        console.log('Formato invalido')
        return
      }
      chess.load(fen)
  //Validar Analisis       
      if(chess.in_checkmate()) await msg.reply('# ' + global.bot_sky)
      if(chess.in_draw() || chess.in_threefold_repetition() || chess.in_stalemate()) await msg.reply('1/2 - 1/2' + global.bot_sky)  
  //Fin Validar fen
      engine.postMessage("uci");
      engine.postMessage("ucinewgame");
      engine.postMessage("position fen " + fen);
      //engine.postMessage("go depth 5");
    
      if(command == 'uciimg')
       url = `http://www.fen-to-image.com/image/36/double/coords/${fen.split(' ')[0]}`
  
       //////////////////////////////////////
       engine.postMessage('go depth 15');
  
       engine.onmessage = (line) => {
        if(line.indexOf("bestmove") > -1) 
        {///IIIIIIIIIIIIIII
          match = line.match(/bestmove\s+(\S+)/);
          if(match)//SOLO PARA BESTOMOVE
          {
            bestMove = match[1]
          if(chess.turn() == 'w')
            leyenda = leyenda + i + '. ' + bestMove   
          else
           leyenda = leyenda == ''?leyenda = leyenda + i + '. _____ - ' + bestMove + '\n':leyenda = leyenda + ' - ' + bestMove+'\n'
           
           chess.move(bestMove, { sloppy: true })
  
           if(chess.turn() == 'w') i = i + 1
           if(chess.in_draw() || chess.in_threefold_repetition() || chess.in_stalemate()) leyenda = leyenda + '1/2 - 1/2'
           if(chess.in_checkmate()) leyenda = leyenda + '#'
          
           
           let fin =  chess.game_over() || chess.in_threefold_repetition() || chess.in_stalemate()
  
           if(fin || i > 5)//Solo evaluar los primeros 5 movimientos pero con profundidad 15
           {
            if(!fin && i > 5) leyenda = leyenda + '*'
            
            if(command == 'uciimg') 
             sock.sendMessage(
              msg.from,
              { 
                 image: { url: url},
                 caption:  leyenda + global.bot_sky                     
              },{ quoted: msg })
            else 
              msg.reply(leyenda + global.bot_sky, { quoted: msg})
            
            //engine.postMessage('quit')
           } 
           else
           {
            engine.postMessage("position fen " + chess.fen());
            engine.postMessage('go depth 15');          
           }          
          }
       }///IIIIIIIIIIIIIII
      }
       //////////////////////////////////////
    
    
      /////////////////////////////////////////////////////////////
      } catch (error) {
         await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
         console.log('Ocurrio un error\n'+error)
      }

   }
}