### CHATBOT Whatsapp (Baileys Provider)

<p align="center">
  <link rel="icon" type="image/jpeg" href="/logo.jpeg" q:head>
</p>


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

```
npm install
npm start
```

---
## Recursos
- [📄 Documentación](https://github.com/JoseQuintana20/ChatBot)
- [🚀 UTP](https://www.utp.edu.co)
- [💻 Github](https://github.com/JoseQuintana20/ChatBot)
- [👌 Facebook](https://www.facebook.com/IngenieriasUTP/)
- [🎥 Instagram](https://www.instagram.com/ingenieriasutp/?)