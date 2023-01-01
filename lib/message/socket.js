// require module
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const djs = require("@discordjs/collection");
const { default: makeWASocket, makeInMemoryStore, DisconnectReason, AnyMessageContent, delay, fetchLatestBaileysVersion, generateWAMessageFromContent, useSingleFileAuthState,MessageType } = require('@adiwajshing/baileys');
const { exec, spawn } = require("child_process");
const axios = require('axios');
// const fetch = require('node-fetch');
const util = require('util');
const path = require("path");
const chalk = require('chalk');


//Variables globales
global.mode = "privado"
global.author= "∁∂∫ixto༒∨i∬∈g∂ "
global.owner = ['50588437704@s.whatsapp.net','50584443511@s.whatsapp.net','50584113093@s.whatsapp.net']
global.creador = ['50588437704@s.whatsapp.net','50584443511@s.whatsapp.net','50584113093@s.whatsapp.net']

global.appRoot = path.resolve(__dirname,"..","..")//path.resolve(__dirname).split("/").slice(0,-2).join("/");
global.bot_sky = '\n______________________________\n*Atte:* _🤖Sky_' 
global.responder_EsEn =  global.appRoot+'/src/ask_sky_es.opus'

global.dialogo_onoff = true
global.dialogogp_onoff = true 

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })
// can be read from a file
store.readFromFile(path.resolve(__dirname, '../session/baileys_store.json'))
// saves the state to a file every 10s
setInterval(() => {
    store.writeToFile(path.resolve(__dirname, '../session/baileys_store.json'))
}, 10_000)

// your session
const { state, saveState } = useSingleFileAuthState(path.resolve(__dirname, `../session/session-md.json`), P({ level: "silent" }));
djs.commands = new djs.Collection();
djs.prefix = ".";

// read command file
const readCommand = () => {
    let rootDir = path.resolve(__dirname, "../../command");
    let dir = fs.readdirSync(rootDir);
    dir.forEach(async (res) => {
        const commandFiles = fs.readdirSync(`${rootDir}/${res}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`${rootDir}/${res}/${file}`);
            djs.commands.set(command.name, command);
        }
    });
    console.log('Command loaded!');
}

// start a connection
async function startSock () {
    try {
        await readCommand()
        const { version, isLatest } = await fetchLatestBaileysVersion()
        console.log(`Baileys Version v${version.join('.')}, isLatest: ${isLatest}`)
        // logger: P({ level: 'silent' }),
        // logger: P({ level: 'trace' }),
        const sock = makeWASocket({
            logger: P({ level: 'silent' }),
            printQRInTerminal: true,
            auth: state,
            version
        })
        
        // will listen from this socket
        // the store can listen from a new socket once the current socket outlives its lifetime
        store.bind(sock.ev)
    
        sock.ev.on('chats.set', () => {
            // can use "store.chats" however you want, even after the socket dies out
            // "chats" => a KeyedDB instance
            console.log('got chats', store.chats.all())
        })
    
        sock.ev.on('contacts.set', () => {
            console.log('got contacts', Object.values(store.contacts))
        })
        
        sock.ev.on('messages.upsert', async m => {
            // console.log(JSON.stringify(m, undefined, 2));
            require('./sockchats')(sock, m, store)
        })
        //#region INICIO--MIS IMPLEMENTACIONES 

        sock.ev.on('group-participants.update', async group_participants_update => {
            require('./sockcgroupparticipantsupdate')(sock, group_participants_update)
        })

        sock.ev.on('CB:action,,battery', json => {
            const batteryLevelStr = json[2][0][1].value
            const batterylevel = parseInt(batteryLevelStr)
            if(batterylevel < 15 )
              console.log('Battery level: ', chalk.red(batterylevel))
            if(batterylevel > 75)
              console.log('Battery level: ', chalk.blue(batterylevel))
            if(batterylevel > 15 && batterylevel < 75)
              console.log('Battery level: ', chalk.green(batterylevel))
          })
          sock.ev.on('CB:action,,identity', json => {
              const numero = json[2][0][1].jid.split('@')[0]//cambiar
              console.log('Cambio tu codigo de seguridad con: ', chalk.green(numero))
          })

        //#endregion    FIN--MIS IMPLEMENTACIONES 
        
        sock.ev.on('messages.update', m => console.log(m))
        sock.ev.on('presence.update', (presences) => {
            Object.values(presences.presences).forEach(lastKnownPresence => {
                console.log("   Id: "+chalk.redBright(presences.id)+"\n   Usuario: ")
                console.log(chalk.green(presences.presences))
                console.log("   Estado: "+chalk.blue(lastKnownPresence.lastKnownPresence))                 
            })
        })
 
        sock.ev.on('chats.update', m => console.log(m))
        sock.ev.on('contacts.update', m => console.log(m))            
        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startSock() : console.log('Koneksi Terputus...')
            }
            console.log('connection update', update)
        })
        
        // listen for when the auth credentials is updated
        sock.ev.on('creds.update', saveState)
    
        // custom function
        sock.sendMessageFromContent = async (mess, obj, opt = {}) => {
           let prepare = await generateWAMessageFromContent(typeof mess == 'object'?mess.key.remoteJid: mess, obj, opt)
           await sock.relayMessage(prepare.key.remoteJid, prepare.message, {
              messageId: prepare.key.id
           })
        return prepare
        }
        
        sock.sendFileFromUrl = async (from, url, caption, msg, men) => {
          let mime = '';
          let res = await axios.head(url)
          mime = res.headers['content-type']
          if (mime.split("/")[1] === "gif") {
               return sock.sendMessage(from, { video: { url: url }, caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg })
          }
           let type = mime.split("/")[0]+"Message"
           if(mime === "application/pdf"){
               return sock.sendMessage(from, { document: { url: url }, mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: msg })
           }
           if(mime.split("/")[0] === "image"){
               return sock.sendMessage(from, { image: { url: url }, caption: caption, mentions: men ? men : []}, {quoted: msg})
           }
           if(mime.split("/")[0] === "video"){
                return sock.sendMessage(from, { video: { url: url }, caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "audio"){
                return sock.sendMessage(from, { audio: { url: url }, caption: caption, mentions: men ? men : [], mimetype: 'audio'}, {quoted: msg })
            }
        }
    
        return sock 
    } catch (error) {
        console.log(error)
        startSock()  
    }


}

startSock()
