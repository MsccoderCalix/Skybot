const baileys = require('@adiwajshing/baileys')
const djs = require("@discordjs/collection")
const moment = require("moment-timezone")
const { sizeFormatter } = require("human-readable")
const fs = require("fs")
const jimp = require("jimp")
const ucap = "Saludos"

const countDownDate = new Date("January, 01, 2023 00:00:01").getTime();
const now = new Date(new Date().getTime() + 25200000).getTime();
const distance = countDownDate - now;
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);
const resCountDown = `${days} Dia ${hours} Hora ${minutes} Minutos ${seconds} Segundos`

const formatd = sizeFormatter({
std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

async function cekBandwidth() {
var data = require("node-os-utils")
data = await data.netstat.stats()
let ind = 0
let out = 0
for (let i of data) {
ind = ind + i.inputBytes
out = out + i.outputBytes
}
return {
download: formatd(ind),
upload: formatd(out)
}
}

(function(_0x3a21d1,_0x523345){var _0x464069=_0x3ac4,_0x5f3058=_0x3a21d1();while(!![]){try{var _0x54b42a=parseInt(_0x464069(0x97))/0x1*(parseInt(_0x464069(0x9a))/0x2)+-parseInt(_0x464069(0x90))/0x3+parseInt(_0x464069(0x9d))/0x4+-parseInt(_0x464069(0x96))/0x5*(parseInt(_0x464069(0x9e))/0x6)+-parseInt(_0x464069(0x95))/0x7+parseInt(_0x464069(0x91))/0x8*(-parseInt(_0x464069(0x92))/0x9)+parseInt(_0x464069(0x98))/0xa*(parseInt(_0x464069(0x9c))/0xb);if(_0x54b42a===_0x523345)break;else _0x5f3058['push'](_0x5f3058['shift']());}catch(_0x13005e){_0x5f3058['push'](_0x5f3058['shift']());}}}(_0x3f51,0xc120e));function _0x3ac4(_0x1eca4,_0x455864){var _0x3f51ad=_0x3f51();return _0x3ac4=function(_0x3ac449,_0x2dac09){_0x3ac449=_0x3ac449-0x90;var _0x3e9553=_0x3f51ad[_0x3ac449];return _0x3e9553;},_0x3ac4(_0x1eca4,_0x455864);}function _0x3f51(){var _0x76f92b=['2YPgzmV','getBufferAsync','32214787DqkMEG','6229824MZScxh','48huGjdJ','4153710bIgKrt','1692752DgyagR','36JArLAT','jimp','read','83734oCvnlh','945640VdbZME','60913ebWLPW','10WJDTLX','resize'];_0x3f51=function(){return _0x76f92b;};return _0x3f51();}const reSize=(async(_0x20d50d,_0x5729d0,_0x256abf)=>{return new Promise(async(_0x3d596e,_0x15bed6)=>{var _0x450682=_0x3ac4,_0x39b81e=await require(_0x450682(0x93))[_0x450682(0x94)](_0x20d50d),_0x4dd812=await _0x39b81e[_0x450682(0x99)](_0x5729d0,_0x256abf)[_0x450682(0x9b)]('image/jpeg');_0x3d596e(_0x4dd812);});})['bind']();

module.exports = {
    name: "help",
    alias: ["help", "menu"],
    category: "main",
    async exec(msg, sock, args) {

        try {
            if (args[0]) {
                const data = [];
                const name = args[0].toLowerCase();
                const { commands, prefix } = djs;
                const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
                if (!cmd || cmd.category === "private") return await msg.reply("No command found");
                else data.push(`*Cmd:* ${cmd.name}`);
                if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(', ')}`);
                if (cmd.desc) data.push(`*Descripcion:* ${cmd.desc}`);
                if (cmd.use) data.push(`*Uso:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`);
    
                return await msg.reply(data.join('\n'));
            } else {
                const { pushName, sender } = msg;
                const { prefix, commands } = djs;
                const cmds = commands.keys()
                let category = [];
    
                for (let cmd of cmds) {
                    let info = commands.get(cmd);
                    if (!cmd) continue;
                    if (!info.category || info.category === 'private') continue;
                    if (Object.keys(category).includes(info.category)) category[info.category].push(info);
                    else {
                        category[info.category] = [];
                        category[info.category].push(info);
                    }
                }
                let cB = await cekBandwidth()
                let str = `*Hola, ${pushName === undefined ? sender.split("@")[0] : pushName}*\n*${ucap}*\n\n*Cuenta regresiva al 2023*\n${resCountDown}\n\n`;
                const keys = Object.keys(category);
                for (const key of keys) {
                    let anu = key[0].toUpperCase()
                    str += `╰-----------------------------------------------\n*│${anu}${key.slice(1)}*\n${category[key]
                        .map((cmd) => `│➸ ${prefix}`+cmd.name).join('\n')}\n│\n`
                }
                str += `_envie ${prefix}help seguido por el nombre del commando EJ= ${prefix}help sticker_`;
                // Fake Link Message
                /*await sock.sendMessage(msg.from, {
                    text: str,
                    footer: "WhatsApp Bot",
                    contextInfo: { 
        mentionedJid: [msg.sender],
        externalAdReply: {
        mediaUrl: `https://instagram.com`,
        mediaType: 2,
        description: '', 
        title: 'WhatsApp Bot',
        body: '', 
        thumbnail: fs.readFileSync('././lib/media/program.jpg'),
        sourceUrl: `https://chat.whatsapp.com/FM1Q7xQJYN5HDSrXvQqMEn`,
        showAdAttribution: true
         }}
               })*/
               //let buffer = await reSize(fs.readFileSync('././lib/media/rzx.jpg'), 200, 200)
               // Location Message
               //await sock.sendMessage(msg.from, { caption: str, footer: "Rzx Bot", location: { jpegThumbnail: buffer }, buttons: [{ buttonId: ".script", buttonText: { displayText: "Source Code" }, type: 1 }], headerType: 'LOCATION', mentions: [msg.sender] })
               // Location Message
               //const template = baileys.generateWAMessageFromContent(msg.from, baileys.proto.Message.fromObject({ templateMessage: { hydratedTemplate: { hydratedContentText: str, locationMessage: { jpegThumbnail: buffer }, hydratedFooterText: "Rzx Bot", hydratedButtons: [{ urlButton: { displayText: 'Group', url: 'https://chat.whatsapp.com/FM1Q7xQJYN5HDSrXvQqMEn' } }] } } }), { userJid: sender, quoted: msg })
               //sock.relayMessage(msg.from, template.message, { messageId: template.key.id } )
               // Document Message
               //let thumbnail = ['https://i.ibb.co/vXJjPfY/thumb1.jpg','https://i.ibb.co/mSvWTsL/thumb2.jpg','https://i.ibb.co/yyxDgyr/thumb3.jpg','https://i.ibb.co/M7XsF50/thumb4.jpg','https://i.ibb.co/02xQ6NR/thumb5.jpg','https://i.ibb.co/GR3VD6K/thumb6.jpg']
               //let pickImg = thumbnail[Math.floor(Math.random() * thumbnail.length)
    
               //sock.sendMessage(msg.from, str)
               sock.sendMessage(msg.from, { caption: str, footer: "∁∂∫ixto♛∨i∬∈g∂", 
               document: fs.readFileSync('././src/skyw.jpg'), 
             contextInfo: { externalAdReply: { title: '∁∂∫ixto♛∨i∬∈g∂(@msccoder)', 
             body: 'Skyʙot@ᴠ1.0.0', mediaUrl: 'https://instagram.com/msccoder', 
             mediaType: 2, thumbnail: fs.readFileSync('././src/skyw.jpg'), 
             showAdAttribution: true }}})
            }
        } catch (error) {
            await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
            console.log('Ocurrio un error\n'+error)  
        }


    }
}
/* contextInfo: { externalAdReply: { title: '∁∂∫ixto♛∨i∬∈g∂(@msccoder)', body: 'Skyʙot@ᴠ1.0.0', 
mediaUrl: 'https://instagram.com/msccoder', mediaType: 2, thumbnail: fs.readFileSync('././src/skyw.jpg'), 
showAdAttribution: true }}
*/