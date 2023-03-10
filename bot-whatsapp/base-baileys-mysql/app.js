const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
/*const MySQLAdapter = require('@bot-whatsapp/database/mysql')*/
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Declaramos las conexiones de MySQL

const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'usr'
const MYSQL_DB_PASSWORD = 'pass'
const MYSQL_DB_NAME = 'bot'
const MYSQL_DB_PORT = '3306'
 */
/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

/*const flowAdmision = addKeyword(['admisión', 'proceso de admisión', 'requisitos'])
    .addAnswer(
        [
            'El proceso de admisión a la Facultad de Ingeniería de la Universidad Tecnológica de Pereira se lleva a cabo cada año.',
            'Los requisitos varían dependiendo del programa académico al que desees aplicar. ¿Podrías proporcionarme más información sobre el programa al que estás interesado/a?',
            '👉 1 - Ingeniería de Sistemas y Computación',
            '👉 2 - Ingeniería Electrónica',
            '👉 3 - Ingeniería Eléctrica',
            '👉 4 - Ingeniería Física',
            '👉 5 - Tecnología en Desarrollo de Software'
        ],
        null,
        null,
        [flowAdmisionSistemas, flowAdmisionIndustrial, flowAdmisionElectronica, flowAdmisionAmbiental, flowAdmisionOtra]
    )*/


// ########################################################################
// #                          FLOW GENERALES                              #
// ########################################################################

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer('Gracias a ti')

const flowUTP = addKeyword(['UTP', 'Universidad Tecnológica de Pereira', '¿Qué es la UTP?','']).addAnswer('La Universidad Tecnológica de Pereira (UTP) es una institución de educación superior ubicada en la ciudad de Pereira, Colombia. Fue fundada en 1962 y es reconocida por su enfoque en la formación de ingenieros y tecnólogos de alta calidad.')

const flowFacultad = addKeyword(['Facultad', 'Facultad de Ingeniería', 'Cuéntame sobre la Facultad de Ingeniería']).addAnswer(
    [
        'La Facultad de Ingeniería es una de las más prestigiosas de la UTP y cuenta con un cuerpo docente altamente capacitado y una amplia experiencia en la industria.',
        'Los estudiantes de la Facultad tienen la oportunidad de participar en proyectos prácticos y programas de intercambio internacional, lo que les permite ampliar sus horizontes y adquirir una experiencia valiosa en su campo de estudio.',
        'La Facultad ofrece programas de pregrado en: Ingeniería de Sistemas y Computación, Ingeniería Electrónica, Ingeniería Eléctrica, Ingeniería Física y Tecnología en Desarrollo de Software. Además, cuenta con posgraorado posgrados como: Especialización en Electrónica Digital, Especialización en Tecnologías de la Información y las Comunicaciones, Maestría en Ingeniería de Sistemas y Computación, Maestría en Ingeniería Eléctrica y Doctorado en Ingeniería.'

])

const flowRedes = addKeyword(['redes sociales', 'redes', '¿Cómo puedo visitar las redes sociales de la Facultad?']).addAnswer('Para enterarte de ofertas laborales, prácticas, monitorías, charlas, te invitamos a seguir nuestras redes sociales en Facebook a través del enlace https://www.facebook.com/IngenieriasUTP y en Instagram a través de https://www.instagram.com/ingenieriasutp/ (@ingenieriasutp).')

// ########################################################################
// #                                FIN                                   #
// ########################################################################

const flowAdmisionSistemasTerminar = addKeyword(['2', 'No, gracias'])
    .addAnswer('¡Entendido! Si necesitas más ayuda en el futuro, no dudes en contactarnos en . ¿Hay algo más en lo que pueda ayudarte?')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ]
    )

const flowAdmisionSistemasMasInfo = addKeyword(['1', 'Sí, quiero saber más'])
    .addAnswer('¡Claro! Para obtener más información sobre el programa de Ingeniería de Sistemas, te recomiendo visitar la página web de la Facultad: https://programasacademicos.utp.edu.co/facultad/ingenierias#ingenierias. ¿Hay algo más en lo que pueda ayudarte?')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito saber algo más',
            '👉 *2* - No, gracias'
        ],
        null,
        null,
        [flowAdmisionSistemasTerminar]
    )

const flowAdmisionSistemas = addKeyword(['1', 'Ingeniería de Sistemas', 'Ingeniería de Sistemas y Computación'])
    .addAnswer('Para el programa de Ingeniería de Sistemas, los requisitos incluyen...')
    .addAnswer(
        [
            '¿Tienes alguna otra pregunta sobre este programa académico?',
            '👉 *1* - Sí, quiero saber más',
            '👉 *2* - No, gracias'
        ],
        null,
        null,
        [flowAdmisionSistemasMasInfo, flowAdmisionSistemasTerminar]
    )

const flowPregados = addKeyword(['1', 'pregrados'])
    .addAnswer(
        [
            'La Facultad ofrece programas de pregrado en:',
            '👉 *1* - Ingeniería de Sistemas y Computación',
            '👉 *2* - Ingeniería Electrónica',
            '👉 *3* - Ingeniería Eléctrica',
            '👉 *4* - Ingeniería Física',
            '👉 *5* - Tecnología en Desarrollo de Software'
        ],
        null,
        null,
        [flowAdmisionSistemas]
    )

const flowProgramas = addKeyword(['2', 'Programas', 'Programas académicos', 'carreras'])
    .addAnswer(
        [
            '👉 *1* - Pregados',
            '👉 *2* - Posgrados'
        ],
        null,
        null,
        [flowPregados]  
    )


const flowPrincipal = addKeyword(['hola', 'buenas'])
    .addAnswer(
        [
            '🙌 ¡Hola! Soy *DaVinci*, bienvenido/a a la Facultad de Ingeniería de la Universidad Tecnológica de Pereira. ¿En qué puedo ayudarte?',
            ' ',
            'Si mis respuestas no te satisfacen, puedes escribirnos a decanoingenierias@utp.edu.co.',
            '\n',
            '👉 *1* - Admisión a la Facultad',
            '👉 *2* - Programas académicos',
            '👉 *3* - Trámites y servicios',
            '👉 *4* - Recursos y apoyo estudiantil'
        ],
        null,
        null,
        [flowProgramas, flowGracias, flowUTP, flowFacultad]
    )
    
/*const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas'])
    .addAnswer('🙌 ¡Saludos! Soy *DaVinci*, tu amigo virtual.')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )
*/

const main = async () => {
    /*const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })*/
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal], [flowRedes])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
