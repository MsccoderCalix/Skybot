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

# cloning repo
git clone https://github.com/calix666/Skybot

# nos ubicamos en directorio
cd Skybot

# instalamos con npm
npm install
# o con yarn
yarn install

# iniciamos el bot
npm start
# o
node .

