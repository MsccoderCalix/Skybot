const axios = require('axios')
const demonios = require('../../lib//function/demonios')
var cheerio = require('cheerio')


module.exports = {
  name: 'signo',
  alias: ['signo','amor','dinero'],
  category: 'main',
  desc: 'Leer Horoscopo personal!',
  use: "'signo <signo>','amor <signo>','dinero <signo>'",
  async exec(msg, sock,arg,args) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////


     let fecha =  new Date();
     let date  = `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}`//  ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()} ` 
     let comando= command=='amor'?'amor-diaria':command=='dinero'?'dinero-semanal':'general-diaria'    
     let amor= ''
     let dinero= ''
     let salud= ''
     let numero= 0
     let color= ''
     let fecha_signo= ''
 
   let signo_aux = validar_zodiaco(args)
 
   signos_validos = '*🌟Signos del Zoodiaco*\n______________________________\n'
 
   let cadena_cuerpo = ''
   for (var [key, value] of signo_zodiaco_es)
     {
       cadena_cuerpo += '*'+key + "* = _" + value+'_\n'            
     }
   signos_validos+=cadena_cuerpo 
 
   if (signo_aux == '') 
     return msg.reply(signos_validos)
   
     let signo = 
     `*🌟Signo:* _${signo_aux[0]+signo_aux[1]}_
     ______________________________
     *Fecha:* _${date}_
     ______________________________
     _#signo#_
     ______________________________
     *Atte el Demonio* _${pickRandom(demonios.demonios)}_`
 
    axios.get(`https://www.horoscopo.com/horoscopos/${comando}-${signo_aux[1]}`)
 
    //https://www.horoscopo.com/horoscopos/general-diaria-${signo_aux[1]}
    //https://www.horoscopo.com/horoscopos/amor-diaria-${signo_aux[1]}
    //https://www.horoscopo.com/horoscopos/dinero-semanal-${signo_aux[1]}
 
    .then((response) => {
        let $ = cheerio.load(response.data);
        let sig=''
        let p= $('p')
        p.each(function(idx,el){
          if(idx==0)
          {
            console.log(idx+'   '+ $(el).text())
            signo= signo.replace('#signo#',$(el).text().split('-')[$(el).text().split('-').length-1].trim())
         }
        })
 
        //let sig=   $("body").find("/html/body/div[3]/main/div[1]/p[1]/text()");
        
    sock.sendMessage(msg.from, { text: signo}, { quoted: msg})
    //conn.reply(m.chat, signo.replace('Hogares','kWh Hogares').replace('Negocio','kWh Negocios')+'______________________________' , m)      
    })
 
   //
   
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}
     
function validar_zodiaco(libro_aux) {
  if(!libro_aux)
   return ''
   
   for (var [key, value] of signo_zodiaco_es)
     {
       if(libro_aux==key || libro_aux.toLowerCase()==value.toLowerCase())
       return [key,value]    
     }
     return ''
 }
 function leer_signo(respuesta, signo, param) {
  let amor= signo.amor
  let dinero= signo.dinero
  let salud= signo.salud
  let numero= signo.numero
  let color= signo.color
  let fecha_signo= signo.fechaSigno

  respuesta=  respuesta.replace('#fecha_signo#',fecha_signo).replace('#numero#', numero).replace('#color#',color)

  switch(param) {
    case '-s':
      respuesta=  respuesta.replace('#signo#',salud)
    break;
    case '-d':
      respuesta=  respuesta.replace('#signo#',dinero)
    break;
    default:
      respuesta=  respuesta.replace('#signo#',amor)
  }
return respuesta
 }

 function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const signo_zodiaco_en = new Map([
  ['♈', 'Aries'],
  ['♉', 'Taurus'],
  ['♊', 'Gemini'],
  ['♋', 'Cancer'],
  ['♌', 'Leo'],
  ['♍', 'Virgo'],
  ['♎', 'Libra'],
  ['♏', 'Scorpio'],
  ['♐', 'Sagittarius'],
  ['♑', 'Capricorn'],
  ['♒', 'Aquarius'],
  ['♓', 'Pisces'],
  ]);

  
const signo_zodiaco_es = new Map([
  ['♈', 'Aries'],
  ['♉', 'Tauro'],
  ['♊', 'Geminis'],
  ['♋', 'Cancer'],
  ['♌', 'Leo'],
  ['♍', 'Virgo'],
  ['♎', 'Libra'],
  ['♏', 'Escorpion'],
  ['♐', 'Sagitario'],
  ['♑', 'Capricornio'],
  ['♒', 'Acuario'],
  ['♓', 'Piscis'],
  ]);