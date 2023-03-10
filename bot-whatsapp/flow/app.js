const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'usr'
const MYSQL_DB_PASSWORD = 'pass'
const MYSQL_DB_NAME = 'bot'
const MYSQL_DB_PORT = '3306'

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

// ########################################################################
// #                          FLOW GENERALES                              #
// ########################################################################

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer('Gracias a ti')

const flowUTP = addKeyword(['UTP', 'Universidad Tecnológica de Pereira', '¿Qué es la UTP?','']).addAnswer('a Universidad Tecnológica de Pereira (UTP) es una institución de educación superior ubicada en la ciudad de Pereira, Colombia. Fue fundada en 1962 y es reconocida por su enfoque en la formación de ingenieros y tecnólogos de alta calidad.')

const flowFacultad = addKeyword(['Facultad', 'Facultad de Ingeniería', 'Cuéntame sobre la Facultad de Ingeniería']).addAnswee(
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

const flowProgramas = addKeyword(['Programas', 'Programas académicos', 'carreras'])
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
            'Si mis respuestas no te satisfacen, puedes escribirnos a decanoingenierias@utp.edu.co.'
        ])

    .addAnswer('Algunos temas que puedo ayudarte son:',{
                buttons:[
                    {
                        body: 'Admisión a la Facultad'
                    },
                    {
                        body: 'Programas académicos'
                    },
                    {
                        body: 'Trámites y servicios'
                    },
                    {
                        body: 'Recursos y apoyo estudiantil'
                    }
                ]
            }

    )
    .addAnswer([
        '¿En qué tema necesitas ayuda específicamente?'
        ],
        null,
        null,
        [flowProgramas, flowGracias, flowUTP, flowFacultad]
    )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
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