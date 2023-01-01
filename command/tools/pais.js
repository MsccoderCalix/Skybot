
const PhoneNumber = require('awesome-phonenumber')
const removeAccents = require('remove-accents')
let funciones = require('../../lib/function/funciones')

module.exports = {
  name: 'pais',
  alias: ['pais'],
  category: 'tools',
  desc: 'Ver el pais origen del usuario!',
  use: '<reply message>',
  async exec(msg, sock,arg, text, store) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

     let pais =''
     let numero = msg.sender    

     if(msg.quoted)
       numero = msg.quoted.participant
   
     if(msg.mentions.length >0) 
      numero = msg.mentions[0]
    
     numero= '+'+numero.split('@')[0]
 
     let respuesta_full =       
     '*_☎País	Prefijo de país📞_*'+
     '\n________  _________________\n\n'
     let respuesta =       
 `*País🔹:*    _%pais_
 *Abreviatura🗝:*    _%abre_
 *Numero📞:*   _%numero_
 *Region_Cod💱:*   _%codigo_
 `
 
       if(text == '-all')
       {    
         let cadena_cuerpo = ''
         for (var [key, value] of prefijos_call)
           {
             cadena_cuerpo += '*'+key + "* ➸ _+" + value+'📞_\n'            
           }
           respuesta_full += cadena_cuerpo 
        await msg.reply(respuesta_full)
         return
       }
       else
       {  
         let abrev_pais = await PhoneNumber(numero).getRegionCode()
         let codigo = PhoneNumber.getCountryCodeForRegionCode(abrev_pais)
         pais = funciones.get_Pais_from_Numero(numero)
         respuesta = respuesta.replace('%pais',pais).replace('%abre',abrev_pais).replace('%numero',numero).replace('%codigo','+'+codigo)
         if(pais == '')
         {
          sock.sendMessage(msg.from, { text: '‼✖Prefijo invalido' }, { quoted: msg })
          console.log('Prefijo invalido')
          return
         }
         else
         sock.sendMessage(msg.from, { text: respuesta}, { quoted: msg })
       }
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        //await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}


const prefijos_call =  
[['Afganistán', '93'],
['Albania', '355'],
['Alemania', '49'],
['Angola', '244'],
['Anguila', '1'],
['Antigua y Barbuda', '1'],
['Antillas Holandesas', '599'],
['Arabia Saudita', '966'],
['Argelia', '213'],
['Argentina', '54'],
['Armenia', '374'],
['Aruba', '297'],
['Australia', '61'],
['Austria', '43'],
['Azerbaiyán', '994'],
['Bahamas', '1'],
['Bangladés', '880'],
['Barbados', '1'],
['Bélgica', '32'],
['Belice', '501'],
['Benín', '229'],
['Bermudas', '1'],
['Bielorrusia', '375'],
['Bolivia', '591'],
['Bosnia y Herzegovina', '387'],
['Botsuana', '267'],
['Brasil', '55'],
['Brunéi', '673'],
['Bulgaria', '359'],
['Burkina Faso', '226'],
['Burundi', '257'],
['Bután', '975'],
['Cabo Verde', '238'],
['Camboya', '855'],
['Camerún', '237'],
['Canadá', '1'],
['Catar', '974'],
['Chad', '235'],
['Chequia', '420'],
['Chile', '56'],
['China', '86'],
['Chipre', '357'],
['Colombia', '57'],
['Comoras', '269'],
['Congo', '242'],
['Corea', '82'],
['Corea del Norte', '850'],
['Costa de Marfil', '225'],
['Costa Rica', '506'],
['Croacia', '385'],
['Cuba', '53'],
['Diego García', '246'],
['Dinamarca', '45'],
['Dominica', '1'],
['Ecuador', '593'],
['Egipto', '20'],
['El Salvador', '503'],
['Emiratos Árabes Unidos', '971'],
['Eritrea', '291'],
['Escocia', '44'],
['Eslovaquia', '421'],
['Eslovenia', '386'],
['España', '34'],
['Estonia', '372'],
['Etiopía', '251'],
['Federación Rusa', '7'],
['Filipinas', '63'],
['Finlandia', '358'],
['Fiyi', '679'],
['Francia', '33'],
['Gabón', '241'],
['Gales', '44'],
['Gambia', '220'],
['Georgia', '995'],
['Ghana', '233'],
['Gibraltar', '350'],
['Granada', '1'],
['Grecia', '30'],
['Groenlandia', '299'],
['Guadalupe', '590'],
['Guam', '1'],
['Guatemala', '502'],
['Guayana Francesa', '594'],
['Guinea', '224'],
['Guinea Ecuatorial', '240'],
['Guinea-Bissau', '245'],
['Guyana', '592'],
['Haití', '509'],
['Holanda', '31'],
['Honduras', '504'],
['HongKong', '852'],
['Hungría', '36'],
['India', '91'],
['Indonesia', '62'],
['Inglaterra', '44'],
['Irak', '964'],
['Irán', '98'],
['Irlanda', '353'],
['Irlanda del Norte', '44'],
['Isla Ascensión', '247'],
['Isla Norfolk', '6723'],
['Islandia', '354'],
['Islas Caimán', '1'],
['Islas Cook', '682'],
['Islas Feroe', '298'],
['Islas Malvinas', '500'],
['Islas Marianas del Norte', '1670'],
['Islas Marshall', '692'],
['Islas Salomón', '677'],
['Islas Turcas y Caicos', '1'],
['Islas Vírgenes Británicas', '1'],
['Islas Vírgenes de los Estados Unidos', '1'],
['Israel', '972'],
['Italia', '39'],
['Jamaica', '1'],
['Japón', '81'],
['Jordania', '962'],
['Kazajistán', '7'],
['Kenia', '254'],
['Kirguistán', '996'],
['Kiribati', '686'],
['Kuwait', '965'],
['Laos', '856'],
['Lesoto', '266'],
['Letonia', '371'],
['Líbano', '961'],
['Liberia', '231'],
['Libia', '218'],
['Liechtenstein', '423'],
['Lituania', '370'],
['Luxemburgo', '352'],
['Macao', '853'],
['Macedonia', '389'],
['Madagascar', '261'],
['Malasia', '60'],
['Malaui', '265'],
['Maldivas', '960'],
['Malí', '223'],
['Malta', '356'],
['Marruecos', '212'],
['Martinica', '596'],
['Mauricio', '230'],
['Mauritania', '222'],
['Mayotte', '262'],
['México', '52'],
['Micronesia', '691'],
['Moldavia', '373'],
['Mónaco', '377'],
['Mongolia', '976'],
['Montenegro', '382'],
['Montserrat', '1'],
['Mozambique', '258'],
['Myanmar', '95'],
['Namibia', '264'],
['Nauru', '674'],
['Nepal', '977'],
['Nicaragua', '505'],
['Níger', '227'],
['Nigeria', '234'],
['Niue', '683'],
['Noruega', '47'],
['Nueva Caledonia', '687'],
['Nueva Zelanda', '64'],
['Omán', '968'],
['Pakistán', '92'],
['Palaos', '680'],
['Palestina', '970'],
['Panamá', '507'],
['Papúa Nueva Guinea', '675'],
['Paraguay', '595'],
['Perú', '51'],
['Polinesia Francesa', '689'],
['Polonia', '48'],
['Portugal', '351'],
['Principado de Andorra', '376'],
['Puerto Rico', '1'],
['Reino de Bahréin', '973'],
['Rep. Dominicana', '1'],
['República Centroafricana', '236'],
['República Democrática del Congo', '243'],
['Reunión', '262'],
['Ruanda', '250'],
['Rumanía', '40'],
['Sáhara Occidental', '212'],
['Samoa', '685'],
['Samoa Americana', '685'],
['San Bartolomé', '590'],
['San Cristóbal y Nieves', '1'],
['San Marino', '378'],
['San Martín', '590'],
['San Pedro y Miquelón', '508'],
['San Vicente y las Granadinas', '1'],
['Santa Elena', '290'],
['Santa Lucía', '1'],
['Santo Tomé y Príncipe', '239'],
['Satélite Inmarsat', '870'],
['Satélite Iridium', '8816'],
['Satélite Thuraya', '882 16'],
['Senegal', '221'],
['Serbia', '381'],
['Seychelles', '248'],
['Sierra Leona', '232'],
['Singapur', '65'],
['Sint Maarten', '599'],
['Siria', '963'],
['Somalia', '252'],
['Sri Lanka', '94'],
['Suazilandia', '268'],
['Sudáfrica', '27'],
['Sudán', '249'],
['Sudán del Sur', '211'],
['Suecia', '46'],
['Suiza', '41'],
['Surinam', '597'],
['Tailandia', '66'],
['Taiwán', '886'],
['Tanzania', '255'],
['Tayikistán', '992'],
['Timor Oriental', '670'],
['Togo', '228'],
['Tokelau', '690'],
['Tonga', '676'],
['Trinidad y Tobago', '868'],
['Túnez', '216'],
['Turkmenistán', '993'],
['Turquía', '90'],
['Tuvalu', '688'],
['Ucrania', '380'],
['Uganda', '256'],
['Uruguay', '598'],
['USA', '1'],
['Uzbekistán', '998'],
['Vanuatu', '678'],
['Vaticano', '39'],
['Venezuela', '58'],
['Vietnam', '84'],
['Wallis y Futuna', '681'],
['Yemen', '967'],
['Yibuti', '253'],
['Zambia', '260'],
['Zimbabue', '263']
]
