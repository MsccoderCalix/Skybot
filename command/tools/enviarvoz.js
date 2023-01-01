
const gTTS = require('gtts');
const chalk = require('chalk');

module.exports = {
  name: 'enviarvoz',
  alias: ['enviarvoz'],
  category: 'tools',
  desc: 'Comando base!',
  use: 'enviarvoz jid|<idioma>',
  async exec(msg, sock,args,txt) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        //   // "sharp": "^0.31.3",
     ////////////////////////////////////////////////////////////

    //  if(((!txt.includes("@c.us") && !txt.includes("@g.us") && !txt.includes("@s.whatsapp.net"))) && (txt.split('|').length != 3))
    //  return msg.reply("Para usar este comando: Escriba el _comando_ y al frente escriba _-pv_ para privado, o _-gp_ para grupos, y frente a ellos use el _ID_, separando el mensaje por |. \nExemplo:\n.enviavoz -gp 5058844****-99445522 | hola?\n\n")
   //PUEDE O NO LLEVAR IDIOMA DE PRIMEDO O DE SEGUNDO PARAMETRO
    let idioma_valido = validar_idioma(args.map(name => name.toLowerCase()))
    let idioma = idioma_valido!=""?idioma_valido[0]:"es"
  //TIENE QUE LLEVAR DESTINO DE SEGUNDO SI IDIOMA O DE PRIMERO SI NO IDIOMA
   let destino =  args[args?.length-1]? args[args?.length-1]:msg.from//args?.split('|')[0].trim()//jid
   if(((!destino.includes("@c.us") && !destino.includes("@g.us") && !destino.includes("@s.whatsapp.net")))) //Si no trae correo por defecto personal
    destino=destino+"@s.whatsapp.net"
    
   let texto = ""
      
     if(msg.quoted?.text)
      texto= msg.quoted.text
      
     if(texto== "" || idioma== "" || destino== "") return msg.reply('No hay texto🤦'+idiomas_validos)
     if(texto.split(" ").length > 100)
      return msg.reply('Texto muy extenso🤦 solo se permiten 100 palabras')

     var gtts = new gTTS(texto, idioma);
     gtts.save(global.appRoot+'/src/leer.mp3', function (err, result) {
       if(err) { throw new Error(err) }
       sock.sendMessage(destino,{ audio: { url: global.appRoot+'/src/leer.mp3'}, mimetype: 'audio/mp4', ptt: true})
       msg.reply("📩Mensaje enviado...")
       console.log(`Exito! archivo guardado en: ${chalk.blue(global.appRoot+'/src/leer.mp3')}`);
     });

     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
      }
   }
}
  
function validar_idioma(array) {
  if(array?.length< 0)
   return ''
   
   for (var [key, value] of idiomas_validos_map)
     {
       if(array.indexOf(key) !=-1 || array.indexOf(value.toLowerCase()) !=-1)
       return [key,value]    
     }
     return ''
 }
const idiomas_validos = `
Seleccione la abreviatura de su idioma
--------------------------------------
'af' : 'Afrikaans'
'sq' : 'Albanian'
'ar' : 'Arabic'
'hy' : 'Armenian'
'ca' : 'Catalan'
'zh' : 'Chinese',
'zh-cn' : 'Chinese (Mandarin/China)'
'zh-tw' : 'Chinese (Mandarin/Taiwan)'
'zh-yue' : 'Chinese (Cantonese)'
'hr' : 'Croatian'
'cs' : 'Czech'
'da' : 'Danish'
'nl' : 'Dutch'
'en' : 'English'
'en-au' : 'English (Australia)'
'en-uk' : 'English (United Kingdom)'
'en-us' : 'English (United States)'
'eo' : 'Esperanto'
'fi' : 'Finnish'
'fr' : 'French'
'de' : 'German'
'el' : 'Greek'
'ht' : 'Haitian Creole'
'hi' : 'Hindi'
'hu' : 'Hungarian'
'is' : 'Icelandic'
'id' : 'Indonesian'
'it' : 'Italian'
'ja' : 'Japanese'
'ko' : 'Korean'
'la' : 'Latin'
'lv' : 'Latvian'
'mk' : 'Macedonian'
'no' : 'Norwegian'
'pl' : 'Polish'
'pt' : 'Portuguese'
'pt-br' : 'Portuguese (Brazil)'
'ro' : 'Romanian'
'ru' : 'Russian'
'sr' : 'Serbian'
'sk' : 'Slovak'
'es' : 'Spanish'
'es-es' : 'Spanish (Spain)'
'es-us' : 'Spanish (United States)'
'sw' : 'Swahili'
'sv' : 'Swedish'
'ta' : 'Tamil'
'th' : 'Thai'
'tr' : 'Turkish'
'vi' : 'Vietnamese'
'cy' : 'Welsh'
`
const idiomas_validos_map = new Map([
  ['af' , 'Afrikaans'],
  ['sq' , 'Albanian'],
  ['ar' , 'Arabic'],
  ['hy' , 'Armenian'],
  ['ca' , 'Catalan'],
  ['zh' , 'Chinese',],
  ['zh-cn' , 'Chinese (Mandarin/China)'],
  ['zh-tw' , 'Chinese (Mandarin/Taiwan)'],
  ['zh-yue' , 'Chinese (Cantonese)'],
  ['hr' , 'Croatian'],
  ['cs' , 'Czech'],
  ['da' , 'Danish'],
  ['nl' , 'Dutch'],
  ['en' , 'English'],
  ['en-au' , 'English (Australia)'],
  ['en-uk' , 'English (United Kingdom)'],
  ['en-us' , 'English (United States)'],
  ['eo' , 'Esperanto'],
  ['fi' , 'Finnish'],
  ['fr' , 'French'],
  ['de' , 'German'],
  ['el' , 'Greek'],
  ['ht' , 'Haitian Creole'],
  ['hi' , 'Hindi'],
  ['hu' , 'Hungarian'],
  ['is' , 'Icelandic'],
  ['id' , 'Indonesian'],
  ['it' , 'Italian'],
  ['ja' , 'Japanese'],
  ['ko' , 'Korean'],
  ['la' , 'Latin'],
  ['lv' , 'Latvian'],
  ['mk' , 'Macedonian'],
  ['no' , 'Norwegian'],
  ['pl' , 'Polish'],
  ['pt' , 'Portuguese'],
  ['pt-br' , 'Portuguese (Brazil)'],
  ['ro' , 'Romanian'],
  ['ru' , 'Russian'],
  ['sr' , 'Serbian'],
  ['sk' , 'Slovak'],
  ['es' , 'Spanish'],
  ['es-es' , 'Spanish (Spain)'],
  ['es-us' , 'Spanish (United States)'],
  ['sw' , 'Swahili'],
  ['sv' , 'Swedish'],
  ['ta' , 'Tamil'],
  ['th' , 'Thai'],
  ['tr' , 'Turkish'],
  ['vi' , 'Vietnamese'],
  ['cy' , 'Welsh']
])


