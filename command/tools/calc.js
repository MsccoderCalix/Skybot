
module.exports = {
  name: 'calc',
  alias: ['calc'],
  category: 'tools',
  desc: 'Calculadora terminal',
  use: 'calc <expression>',
  async exec(msg, sock,arg,args) {
     try {

      let val = args
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
     ////////////////////////////////////////////////////////////
     console.log(val)
     let result = (new Function('return ' + val))()
     if (!result) throw result
     msg.reply(`*${format}* = _${result}_`, { quoted: msg})
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}
