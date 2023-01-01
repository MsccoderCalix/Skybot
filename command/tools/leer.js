const gTTS = require('gtts');
const chalk = require('chalk');

module.exports = {
  name: 'leer',
  alias: ['leer'],
  category: 'tools',
  desc: 'Comando base!',
  use: 'leer idioma|texto',
  async exec(msg, sock,args,txt) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

     let texto= ""//msg.quoted?msg.quoted.text:txt.indexof("#")!=-1?txt.split("#")[1]:txt
     let idioma= ""
      
     if(msg.quoted?.text)
      {
         texto= msg.quoted.text
         idioma= args.length==0?"es":args[0]
      }
      else if (args.length != 0) {
         
         texto= txt.indexOf("|")!=-1?txt.split("|")[1]:txt
         idioma= txt.indexOf("|")!=-1?txt.split("|")[0]:"es"
      }

     if(texto== "" || idioma== "") return msg.reply('No hay texto🤦'+idiomas_validos)
     if(texto.split(" ").length > 100)
      return msg.reply('Texto muy extenso🤦 solo se permiten 100 palabras')

     var gtts = new gTTS(texto, idioma);
     gtts.save(global.appRoot+'/src/leer.mp3', function (err, result) {
       if(err) { throw new Error(err) }
       sock.sendMessage(msg.from,{ audio: { url: global.appRoot+'/src/leer.mp3'}, mimetype: 'audio/mp4', ptt: true})
       console.log(`Exito! archivo guardado en: ${chalk.blue(global.appRoot+'/src/leer.mp3')}`);
     });

     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
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
     


