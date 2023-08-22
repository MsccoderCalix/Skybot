# Skybot
 __________________________
 
 - [![MscCoder](https://img.shields.io/badge/MscCoder-Calixto_Villega-1877F2?style=for-the-badge&logo=probot&logoColor=white&labelColor=black)]()</br>
 
 ### Bot avanzado creado en Visual Studio Code y Nodejs
 ### Cuenta opciones de bienvenida, colecciones de frases, consejos, refranes y la biblia reyna valera 1960.</br>
 ### Tiene opciones para hacer publico o privado el bot, filtrar informacion de los contactos, phising, clonar grupos de whatsapp, diferentes tipos de mensajes bug que whatsapp no puede interpretar, mensajes trabas y mucho mas
 ### Tambien cuenta con un repertorio de ajedrez donde puedes resolver ejercicios en interaccion con whatsapp
 ### He añadido una serie de comandos para hacking de los cuales puedes hacer uso bajo tu responsabilidad
 ### No estoy afiliado a whatsapp usar con moderacion tu numero puede ser suspendido

## Options

Opciones del comando
{
   name: <String>,
   alias: <Array>, 
   desc: <String>, 
   use: <String>, 
   category: <String>, 
   exec: [AsyncFunction: exec]
}
```

## Ejemplo

{
  name: "menu",
  alias: ["menu","help"],
  desc: "muestra los comandos soportados del bot",
  category: "main"
  async exec(msg) {
     msg.reply("Hello World!")
  }
}
```


## Instalacion

### requisitos
1. [nodejs](https://nodejs.org/en/download) 16x/17x
2. [ffmpeg](https://ffmpeg.org)
3. [libWebP](https://developers.google.com/speed/webp/download)

### Clonar

git clone https://github.com/calix666/Skybot

## nos ubicamos en directorio
cd Skybot

## instalamos con npm
npm install
## o con yarn
yarn install

## iniciamos el bot
npm start
## o
node .