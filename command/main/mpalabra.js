

const fs = require('fs');
const Path = require('path');
const { isNumber } = require('util');
const { string } = require('yargs');
let util = require('util')
let  funciones = require('../../lib/function/funciones'); 


module.exports = {
  name: 'mpalabra',
  alias: ['mpalabra','mpalabra_sys'],
  category: 'main',
  desc: 'Detector de lenguaje ofensivo!',
  use: 'mpalabra <palabra>',
  async exec(msg, sock,arg,txt) {
     try {
     ////////////////////////////////////////////////////////////
     const command = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
     if(command == 'mpalabra_sys')
     await msg.reply('🚫 *_Cuidado_* 🆘\nSe detectó palabras: _'+txt+'‼_ que pueden ser ofensivas para ciertos usuarios\n_Si mi análisis te parece incorrecto házmelo saber_');      
   else
   {
     let mpal = funciones.esBuenaFrase(txt)
     if(mpal != '')
       await msg.reply('🚫 *_Afirmativo_* 🆘\nSe detectó palabras: _'+mpal+'‼_ que pueden ser ofensivas para ciertos usuarios\n_Si mi análisis te parece incorrecto házmelo saber_');      
     else
       await msg.reply('✔ *_Negativo_* 🍀☑\nNo detecte palabras ofensivas en el texto analizado.\n_Si mi análisis te parece incorrecto házmelo saber_');      
   }
   
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}