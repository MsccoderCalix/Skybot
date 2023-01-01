module.exports = {
  name: 'enc',
  alias: ['enc'],
  category: 'tools',
  desc: 'Realizar encuesta!',
  use: '<reply message>',
  async exec(msg, sock,arg) {
     try {
   //.enc encuesta parametro1#Parametro2#parametro3

   let encuesta = arg[0]
   let elementos = arg[1].split('#')
   let rows = []
   let num= ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟']

   for (let index = 0; index < elementos.length; index++) {
     const element = elementos[index]
     rows.push({title: `${num[index % 10]}-${element}`,  rowId:`id${index}`})
   }
 
 const sections = [{title: '🤖Sky❗', rows: rows}]
 
 const button = {
  buttonText: '🔘Seleccione',
  description: `*${encuesta}❔*`,
  sections: sections,
  listType: 1
 }
 const listMessage1 = {
  text: 'Lista de seleccion',
  footer: "_🤖SkyBot_",
  title: `*${encuesta}❔*`,
  buttonText: '🔘Seleccione',
  sections
  }
     
 sock.sendMessage(msg.from,listMessage1)

     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}