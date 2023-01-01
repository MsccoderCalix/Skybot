
module.exports = {
  name: 'bt',
  alias: ['bt'],
  category: 'tools',
  desc: 'Botones de seleccion',
  use: 'bt op1#op2#...#op10',
  async exec(msg, sock,arg,args) {
  try{

    let encuesta = arg[0]
    let elementos = arg[1].split('#')
    let num= ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟']
    let rows = []

      const buttons = []

      for (let index = 0; index < elementos.length; index++) {
        const element = elementos[index]
        buttons.push( {buttonId: `id${index}`, buttonText: {displayText: `${num[index % 10]}-${element}`}, type: 1})
      }
      const buttonMessage = {
        text: `_*☑${encuesta}❔*_`,
        footer: '_🤖Sky❗_',
        buttons: buttons,
        headerType: 1
    }
      // const buttonMessage = {
      //     contentText: `_*☑${encuesta}❔*_`,
      //     footerText: '_🤖Sky❗_',
      //     buttons: buttons,
      //     headerType: 1
      // }

      await sock.sendMessage(msg.from, buttonMessage)      

  }catch (error) {
    await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
    console.log('Ocurrio un error\n'+error)
 }
}
}
