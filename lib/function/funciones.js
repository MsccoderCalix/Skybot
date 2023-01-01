const { Console } = require('console');

function esBuenaFrase(pregunta)
{    
  try {      
    const malasPalabras = require('./mpalabra_archivo');  
  
    let esBuenaFrase = true
    let lista_malas = ''
    let listaDePalabras = pregunta.toLowerCase().split(' ')

    for (let index = 0; index < listaDePalabras.length; index++) 
    {
        let unaPalabra = listaDePalabras[index].trim();
        
        for (let j = 0; j < malasPalabras.mpalabras.length; j++)
         {
           let otrapalabra = malasPalabras.mpalabras[j].trim().toLowerCase()

            if(unaPalabra == otrapalabra)
            {
                esBuenaFrase = false
                if(lista_malas == '')
                  lista_malas += "['"+unaPalabra
                else
                  lista_malas += "' '"+unaPalabra
                break
            }
        }
    }  
    if(!esBuenaFrase)
     lista_malas += "']"
    return lista_malas

  } catch (error) {
    console.log('Ocurrio un error.\n  function esBuenaFrase()\n'+error)
    return ''
  }
}

  function respuesta_defecto()
  {
    try {
      let fs = require('fs')
      let askreply = require('./askreply')
      let fslist = fs.readFileSync(global.appRoot + '/Frases/bonita.txt').toString().split('\n')
      let fsid = fslist[Math.floor(Math.random() * fslist.length)]

    return askreply.respuesta_xdefecto + '\n______________________________\n_🍀'+fsid+'📖_\n______________________________\n*Atte:* _🤖Sky_\n'
    
  } catch (error) {
      console.log('Ocurrio un error.\n  function respuesta_defecto()\n'+error)
      return ''
    }
}

  function esDialogo(Frase)
    {
      try {
        const askreply = require('./askreply')
        for (var [key, value] of askreply.respuestas_map)
        {
            if(Frase == key)
            return value    
        }
        return ''
      } catch (error) {
        console.log('Ocurrio un error.\nfunction esDialogo(Frase)\n'+error)
        return ''
      }
  }

  function tts(lang, text) {
    let gtts = require('node-gtts')
    let fs = require('fs')
    let path = require('path')
    let { spawn } = require('child_process')
    
    return new Promise((resolve, reject) => {
      try {
        let tts = gtts(lang)
        let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav')
        let mp3 = filePath.replace(/wav$/, 'opus')
        tts.save(filePath, text, () => {
          spawn('ffmpeg', [
            '-i', path.resolve(filePath),
            '-vn',
            '-c:a', 'libopus',
            '-b:a', '128k',
            '-vbr', 'on',
            '-compression_level', '10',
            path.resolve(mp3)
          ])
          .on('exit', (err) => {
            fs.unlinkSync(filePath)
            if (err) reject(err)
            resolve(fs.readFileSync(mp3))
            fs.unlinkSync(mp3)
          })
        })
      } catch (e) { 
        Console.log(e)
        //reject(e) 
      }
    })
  }

  function contactos(participants, nombre_grupo, store)
  {   
    let listintegrantes = []
    const { Random } = require("random-js");
    const random = new Random(); // uses the nativeMath engine
    
    participants.forEach(element => {
      if(element.id != global.owner[0])
      {       
        const numero = element.id.split('@')[0]//.replace(/@s.whatsapp.net/g, '')
        let name=  undefined//store.chats.array.filter(v => v.id==element.id).name
        //let name = store.chats.array.filter(v => v.id.endsWith('g.us'))
        //let name = numero//conn.getName(element.id.replace(/@c.us/g, '@s.whatsapp.net'))
        name = name!=undefined?name:numero

        //Líneas de latitud entre -90 y +90 grados, las coordenadas de Longitud entre -180 y +180
        let latitude = random.real(-90, 90).toFixed(6);//reemplazar por azar entre latitud minima y maxima
        let longitud = random.real(-180, 180).toFixed(6);//reemplazar por azar entre longitud minima y maxima
        //Math.floor(Math.random() * 300)
    
        const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
        + 'VERSION:3.0\n'
        + `FN:${name}\n` // full name
        + 'ORG:🤖Sky;\n' // the organization of the contact
        + `EMAIL: ${name.replace(/\s/g, '_')}@Sky.com\n`
        + `LABEL;TYPE=WORK,PREF:Grupo_WhatsApp: ${nombre_grupo}\n`
        + `ADR;TYPE=HOME:;;GPS_Latitude: ${latitude};GPS_Longitud: ${longitud}\n`
        + `TEL;type=CELL;type=VOICE;waid=${numero}:+${numero}\n` // WhatsApp ID + phone number
        + 'END:VCARD'
    //const contacto = {displayname: name, vcard: vcard}
    //const contacto ={contacts: {displayName: name,contacts: [{ vcard }]}}
    //listintegrantes.push(contacto)
    listintegrantes.push({ vcard })
      }
    });
  
    return listintegrantes
  }

  function get_Pais_from_Numero(numero)//+50588443511
  {   
    const Paises = require('./Paises'); 
    const PhoneNumber = require('awesome-phonenumber')
    const removeAccents = require('remove-accents')

    let abrev_pais = PhoneNumber(numero).getRegionCode()

    for (let [key, value] of Paises.paises)
    {
      if(abrev_pais == removeAccents(key) || abrev_pais.toLowerCase() == value.toLowerCase())
        return value             
    }
    
    return ''
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
  function getGroupAdmins(participantes) {
    try {
      var admins = []
      if(participantes === undefined)
      return []
  
      for (let i of participantes) {
         (i.admin === "admin" || i.admin === "superadmin") ? admins.push(i.id) : ''
      }
      return admins
    } catch (error) {
      return []
    }
  }

  function getGroupSuperAdmin(participantes) {
    try {
      var superadmin = []
      if(participantes === undefined)
      return []
  
      for (let i of participantes) {
         (i.admin === "superadmin") ? admins.push(i.id) : ''
      }
      return superadmin
    } catch (error) {
      return []
    }
  }

  function validarmensaje(body) {
    try {
      //const isURL = require('isurl')

      let auditar=""

      if (body.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi)) || body.match(new RegExp(/(https:\/\/chat.whatlsapp.com)/gi)))
        return "LINKWHATSAPP"

      if ((body.match(new RegExp(/(https:\/\/)/gi))) || (body.match(new RegExp(/(http:\/\/)/gi)))) //|| isURL(new URL(body)))
        return "URL"

      if (body && ['jaja','jajaja', 'jeje', 'jejeje', 'jiji', 'jijiji', 'jojo','jojojo', 'juju','jujuju', 'ahahah','hshs','hshshs', 'haha','hahaja', 'ha3', 'kkk', 'jj', 'jjj','jjjj', 'jaj', 'jej', 'jij', 'joj', 'juj'].indexOf(body.toLowerCase()) != -1)
        return "RISA"

      if (body.length > 5000)
        return "TRABA"

    //ES MALA PALABRA
      if(body[0] != '.' && body.split(' ').length < 150){
        let mpal = esBuenaFrase(body.toLowerCase())    
        if(mpal != '')
        {
          return '.mpalabra_sys '+ mpal
        }
      }

    //Es Dialogo
    let dialogo = esDialogo(body.toLowerCase())
    if(dialogo != '')
      return '.dialogo_sys '+ body + "#%#" +  dialogo


    return auditar
    } catch (error) {
      console.log(error)
      return "ERROR"
    }
  }

exports.esBuenaFrase = esBuenaFrase;
exports.respuesta_defecto = respuesta_defecto;
exports.esDialogo = esDialogo;
exports.tts = tts;
exports.contactos = contactos;
exports.get_Pais_from_Numero = get_Pais_from_Numero;
exports.pickRandom = pickRandom;
exports.getGroupAdmins = getGroupAdmins;
exports.getGroupSuperAdmin = getGroupSuperAdmin;
exports.validarmensaje = validarmensaje;