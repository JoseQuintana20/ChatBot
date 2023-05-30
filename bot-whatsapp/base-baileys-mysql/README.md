### CHATBOT Whatsapp (Baileys Provider)

<p align="center">
  <img width="300" src="https://i.imgur.com/tBs6LZx.png">
</p>

<!-- 
**Con esta librería, puedes construir flujos automatizados de conversación de manera agnóstica al proveedor de WhatsApp,** configurar respuestas automatizadas para preguntas frecuentes, recibir y responder mensajes de manera automatizada, y hacer un seguimiento de las interacciones con los clientes.  Además, puedes configurar fácilmente disparadores que te ayudaran a expandir las funcionalidades sin límites. **[Ver más informacion](https://bot-whatsapp.netlify.app/)**

```js
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(BaileysProvider, {
        accountSid: process.env.ACC_SID,
        authToken: process.env.ACC_TOKEN,
        vendorNumber: process.env.ACC_VENDOR,
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}
```
-->
**Para ejecutar la aplicación desde la línea de comando, sigue estos pasos:**

1. Abre una terminal o línea de comandos en tu sistema operativo.
2. Navega hasta la carpeta raíz de la aplicación usando el comando `cd` seguido de la ruta de la carpeta.
3. Asegúrate de tener todas las dependencias de la aplicación instaladas ejecutando el comando `npm install`. Esto descargará y configurará todas las dependencias necesarias según se indique en el archivo `package.json`.
4. Una vez que las dependencias estén instaladas, puedes ejecutar la aplicación usando el comando `npm start` o `node app.js`.
Recuerda que debes ejecutar estos comandos en la terminal desde la ubicación correcta, es decir, la carpeta raíz de la aplicación donde se encuentra el archivo `package.json` y `app.js`. Asegúrate también de tener Node.js y npm correctamente instalados en tu sistema.

```
npm install
npm start
```

Al ejecutar ``npm start`` o ``node app.js``, la aplicación se iniciará y estará lista para recibir y procesar las solicitudes correspondientes.

---
## Recursos
- [📄 Documentación](https://github.com/JoseQuintana20/ChatBot)
- [🚀 UTP](https://www.utp.edu.co)
- [💻 Github](https://github.com/JoseQuintana20/ChatBot)
- [👌 Facebook](https://www.facebook.com/IngenieriasUTP/)
- [🎥 Instagram](https://www.instagram.com/ingenieriasutp/?)