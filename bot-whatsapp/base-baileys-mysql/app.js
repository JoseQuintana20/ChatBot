const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const { setTimeout } = require('timers');

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

const flowUTP = addKeyword(['UTP', 'Universidad Tecnológica de Pereira', '¿Qué es la UTP?','']).addAnswer(['La Universidad Tecnológica de Pereira (UTP) es una institución de educación superior ubicada en la ciudad de Pereira, Colombia. Fue fundada en 1962 y es reconocida por su enfoque en la formación de ingenieros y tecnólogos de alta calidad.'],
    { capture: true, buttons: [{ body: 'Volver al Menu' }] },
        async (ctx, { flowDynamic, endFlow }) => {
            return flowDynamic(`Volviendo al Menu...`);
    }
)

// ########################################################################
// #                                FIN PROGRMAS                          #
// ########################################################################

// ########################################################################
// #                                FIN POSGRADOS                         #
// ########################################################################

// ########################################################################
//                       FIN Doctorado en Ingenieria                      #
// ########################################################################

const flowDoctoradoContac = addKeyword(['5', 'Contacto'])
    .addAnswer(
        [
            'Contactos: (57) 3206948951',
            'Correo electrónico: doctoradoingenieria@utp.edu.co',
            '           https://ingenierias.utp.edu.co/maestria-ingenieria-en-sistemas-y-computacion/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowDoctoradoUbi = addKeyword(['4', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: Facultad de Ingenierías UTP – Doctorado en Ingeniería Edificio Nº 15, Bloque C, Oficina 15C-104')

const flowDoctoradoIF = addKeyword(['3', 'Inversión y Financiación', 'Inversión', 'Financiación'])
    .addAnswer(
        [
            '*INVEESIÓN Y FINANCIACIÓN*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/doctorado-ingenieria/inversion-y-financiacion/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowDoctoradoPLan = addKeyword(['2', 'Plan de Estudios', 'Plan'])
    .addAnswer(
        [
            '*PLAN DE ESTUDIO*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/doctorado-ingenieria/plan-de-estudios/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowDoctoradoGeneral = addKeyword(['1', 'Información General', 'Información'])
    .addAnswer(
        [
            '*INFORMACIÓN GENERAL*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/doctorado-ingenieria/generalidades/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowDoctorado = addKeyword(['5', 'Doctorado en Ingenieria'])
    .addAnswer([
        '*Descripción*',
        'El Doctorado en Ingeniería es un programa de investigación con capacidad de resolver problemas prácticos de la ingeniería a partir de la formulación de proyectos de investigación y que contribuye al crecimiento académico de la Universidad, la región y el país. El Doctorado cuenta con 5 líneas de investigación (sistemas eléctricos, automática y electrónica, sistemas de producción, mecánica y ciencias computacionales) las cuales cubren amplios aspectos de la ingeniería y coherente con los actuales requerimientos que demanda una sociedad basada en el conocimiento.',
        ])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Información General',
            '👉 *2* - Plan de Estudios',
            '👉 *2* - Inversión y Financiación',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowDoctoradoGeneral, flowDoctoradoPLan, flowDoctoradoIF, flowDoctoradoUbi ,flowDoctoradoContac]
    )

// ########################################################################
// #                    INICIO Doctorado en Ingenieria                    #
// ########################################################################

// ########################################################################
//         FIN Maestría en Ingeniería de Sistemas y Computación           #
// ########################################################################

const flowMSistemasContac = addKeyword(['5', 'Contacto'])
    .addAnswer(
        [
            'Contactos: Nº Tel: (6) 3137300 ext. 7489 – Directo 313 74 89',
            'Correo electrónico: misc@utp.edu.co',
            '           https://ingenierias.utp.edu.co/maestria-ingenieria-en-sistemas-y-computacion/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMSistemasUbi = addKeyword(['4', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: Facultad de Ingenierías  – Maestría en Ingeniería de Sistemas y Computación  – Edificio 15 / Bloque C / Oficina 104')

const flowMSistemasIF = addKeyword(['3', 'Inversión y Financiación', 'Inversión', 'Financiación'])
    .addAnswer(
        [
            '*INVEESIÓN Y FINANCIACIÓN*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-en-sistemas-y-computacion/inversion-y-financiacion/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMSistemasPLan = addKeyword(['2', 'Plan de Estudios', 'Plan'])
    .addAnswer(
        [
            '*PLAN DE ESTUDIO*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-en-sistemas-y-computacion/plan-de-estudios/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMSistemasGeneral = addKeyword(['1', 'Información General', 'Información'])
    .addAnswer(
        [
            '*INFORMACIÓN GENERAL*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-en-sistemas-y-computacion/generalidades/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMSistemas = addKeyword(['4', 'Maestría en Ingeniería de Sistemas y Computación', 'Ingeniería de Sistemas y Computación'])
    .addAnswer([
        '*Descripción*',
        'El programa de la Maestría en Ingeniería de Sistemas y Computación de la Universidad Tecnológica de Pereira, se concibe como espacio de formación para la innovación y la investigación pura y aplicada apoyada en las Ciencias de la Computación donde los aspirantes sin importar su carrera, son bienvenidos a formar parte de este nuevo mundo de las ciencias de la computación lleno de inagotables experiencias y oportunidades. Con una clara finalidad del desarrollo de nuestra sociedad, pero siempre contribuyendo a la preservación del medio ambiente, todo enmarcado dentro de los lineamientos del PDI, y articulado con centros educativos, grupos de investigación adscritos al programa y centros de investigación tanto nacionales como internacionales. Siempre apoyados por profesores y tutores del más alto nivel académico y con acreditación internacional de alta calidad bajo el sello EUR-ACE y con un convenio de becas con la Universidad de Salerno (ITL) para obtener una doble titulación.',
        ])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Información General',
            '👉 *2* - Plan de Estudios',
            '👉 *2* - Inversión y Financiación',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowMSistemasGeneral, flowMSistemasPLan, flowMSistemasIF, flowMSistemasUbi ,flowMSistemasContac]
    )

// ########################################################################
// #     INICIO Maestría en Ingeniería de Sistemas y Computación          #
// ########################################################################

// ########################################################################
// #                FIN Maestría en Ingenieria Eléctrica                  #
// ########################################################################

const flowMElectricaContac = addKeyword(['5', 'Contacto'])
    .addAnswer(
        [
            'Contactos: Nº Tel:(57) (6) 313 7154',
            'Correo electrónico: mie@utp.edu.co',
            '           https://ingenierias.utp.edu.co/maestria-ingenieria-electrica/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMElectricaUbi = addKeyword(['4', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowMElectricaIF = addKeyword(['3', 'Inversión y Financiación', 'Inversión', 'Financiación'])
    .addAnswer(
        [
            '*INVEESIÓN Y FINANCIACIÓN*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-electrica/inversion-y-financiacion/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMElectricaPLan = addKeyword(['2', 'Plan de Estudios', 'Plan'])
    .addAnswer(
        [
            '*PLAN DE ESTUDIO*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-electrica/plan-de-estudios/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMElectricaGeneral = addKeyword(['1', 'Información General', 'Información'])
    .addAnswer(
        [
            '*INFORMACIÓN GENERAL*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/maestria-ingenieria-electrica/generalidades/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowMElectrica = addKeyword(['3', 'Maestría en Ingenieria Eléctrica', 'Ingenieria Eléctrica'])
    .addAnswer([
        '*Descripción*',
        'Somos un programa que se encarga de propiciar espacios para la formación de profesionales altamente capacitados, líderes  en el sector eléctrico que entiendan la dinámica del área y utilicen la investigación aplicada para dar soluciones prácticas a problemas específicos a partir de casos de estudio e innovación tecnológica en el uso eficiente apoyados por orientadores de alto nivel académico adscritos a grupos de investigación y con amplia trayectoria.',
        ])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Información General',
            '👉 *2* - Plan de Estudios',
            '👉 *2* - Inversión y Financiación',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowMElectricaGeneral, flowMElectricaPLan, flowMElectricaIF, flowMElectricaUbi ,flowMElectricaContac]
    )

// ########################################################################
// #               INICIO Maestría en Ingenieria Eléctrica                #
// ########################################################################

// ########################################################################
// #       FIN Tecnologías de la Información y las Comunicaciones         #
// ########################################################################

const flowTecnoContac = addKeyword(['5', 'Contacto'])
    .addAnswer(
        [
            'Contactos: Nº Tel: (6) 3137489 – Ext 489, Fax: 3137121. Ext 121',
            'Correo electrónico: esptic@utp.edu.co',
            '           https://ingenierias.utp.edu.co/especializacion-tics/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnoUbi = addKeyword(['4', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: Facultad de Ingenierías UTP – Especialización en Tecnologías de la información y las comunicaciones / Edificio: 15C-104')

const flowTecnoIF = addKeyword(['3', 'Inversión y Financiación', 'Inversión', 'Financiación'])
    .addAnswer(
        [
            '*INVEESIÓN Y FINANCIACIÓN*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-tics/inversion-y-financiacion/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnoPLan = addKeyword(['2', 'Plan de Estudios', 'Plan'])
    .addAnswer(
        [
            '*PLAN DE ESTUDIO*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-tics/plan-de-estudios/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnoGeneral = addKeyword(['1', 'Información General', 'Información'])
    .addAnswer(
        [
            '*INFORMACIÓN GENERAL*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-tics/generalidades/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecno = addKeyword(['2', 'Tecnologías de la Información y las Comunicaciones', 'Información y las Comunicaciones'])
    .addAnswer([
        '*Descripción*',
        'La Especialización en Tecnologías de la Información y las Comunicaciones brinda las herramientas necesarias para que nuestros egresados estén en capacidad de liderar los procesos de transformación en las empresas apoyados en tecnologías emergentes integrando redes de datos, servicios, ciberseguridad, computación en la nube e Internet de las cosas, entre otros, permitiendo a las organizaciones insertarse en la cuarta revolución industrial basada en tecnologías 4.0. Cuenta con el apoyo de grupos de investigación de la Facultad de Ingenierías que aplican dichos conocimientos en proyectos de innovación facilitando la transferencia de conocimiento.',
        ])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Información General',
            '👉 *2* - Plan de Estudios',
            '👉 *2* - Inversión y Financiación',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowTecnoGeneral, flowTecnoPLan, flowTecnoIF, flowTecnoUbi ,flowTecnoContac]
    )

// ########################################################################
// #      INICIO Tecnologías de la Información y las Comunicaciones       #
// ########################################################################

// ########################################################################
// #                           FIN ELECTRÓNICA DIGITAL                    #
// ########################################################################

const flowElectronicaDContac = addKeyword(['5', 'Contacto'])
    .addAnswer(
        [
            'Contacto: especializacion.electronica.digital@utp.edu.co',
            '           https://ingenierias.utp.edu.co/especializacion-electronica-digital/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaDUbi = addKeyword(['4', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowElectronicaDIF = addKeyword(['3', 'Inversión y Financiación', 'Inversión', 'Financiación'])
    .addAnswer(
        [
            '*INVEESIÓN Y FINANCIACIÓN*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-electronica-digital/inversion-y-financiacion/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaDPLan = addKeyword(['2', 'Plan de Estudios', 'Plan'])
    .addAnswer(
        [
            '*PLAN DE ESTUDIO*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-electronica-digital/plan-de-estudios/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaDGeneral = addKeyword(['1', 'Información General', 'Información'])
    .addAnswer(
        [
            '*INFORMACIÓN GENERAL*\n',
            'Puedes encontrar información en: https://ingenierias.utp.edu.co/especializacion-electronica-digital/generalidades/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaD = addKeyword(['1', 'Especialización en Electrónica Digital', 'Electrónica Digital'])
    .addAnswer([
        '*Descripción*',
        'La especialización en electrónica digital busca la integración de diversas áreas del conocimiento en torno a la Internet de las Cosas, conteniendo las líneas de las comunicaciones, sistemas embebidos, ciberseguridad, fotónica, telemetría, control y actuación que aporten a la solución de los problemas regionales y globales.',
        ])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Información General',
            '👉 *2* - Plan de Estudios',
            '👉 *2* - Inversión y Financiación',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowElectronicaDGeneral, flowElectronicaDPLan, flowElectronicaDIF, flowElectronicaDUbi ,flowElectronicaDContac]
    )

// ########################################################################
// #                        INICIO ELECTRÓNICA DIGITAL                    #
// ########################################################################

const flowPosgrados = addKeyword(['2', 'pregrados'])
    .addAnswer(
        [
            'La Facultad ofrece programas de pregrado en:',
            '👉 *1* - Especialización en Electrónica Digital',
            '👉 *2* - Especialización en Tecnologías de la Información y las Comunicaciones',
            '👉 *3* - Maestría en Ingeniería Eléctrica',
            '👉 *4* - Maestría en Ingeniería de Sistemas y Computación',
            '👉 *5* - Doctorado en Ingeniería',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowElectronicaD, flowTecno, flowMElectrica, flowMSistemas, flowDoctorado]
    )

// ########################################################################
// #                                INICIO POSGRADOS                      #
// ########################################################################

// ########################################################################
// #                                FIN PREGRADO                          #
// ########################################################################

// ########################################################################
// #                                FIN TECNOLOGÍA                        #
// ########################################################################

const flowTecnologiaContac = addKeyword(['4', 'Contacto'])
    .addAnswer(
        [
            'Contactos: Nº Tel: (6) 3137300 ext. 7787- Directo 313 7787',
            'Correo electrónico del programa: jeny.gutierrez@utp.edu.co',
            '           https://ingenierias.utp.edu.co/ingenieria-fisica/contacto/'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnologiaUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación en: Edificio 15 / Bloque C / Oficina 305')

const flowTecnologiaInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('Info:')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnologiaPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/tecnologia-en-desarrollo-de-software/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowTecnologia= addKeyword(['6', 'Tecnología en Desarrollo del Software', 'Tecnología', 'Desarrollo del Software', 'Software'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowTecnologiaPresentacion, flowTecnologiaInfo, flowTecnologiaUbi, flowTecnologiaContac]
    )

// ########################################################################
// #                                INICIO TECNOLOGÍA                     #
// ########################################################################

// ########################################################################
// #                                FIN FÍSICA                            #
// ########################################################################

const flowFisicaContac = addKeyword(['4', 'Contacto'])
    .addAnswer('Contactanos en : https://ingenierias.utp.edu.co/ingenieria-fisica/contacto/')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowFisicaUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowFisicaInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('Info:')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowFisicaPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/ingenieria-fisica/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowFisica= addKeyword(['5', 'Ingeniería de Física', 'Física'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowFisicaPresentacion, flowFisicaInfo, flowFisicaUbi, flowFisicaContac]
    )

// ########################################################################
// #                                INICIO FÍSICA                         #
// ########################################################################

// ########################################################################
// #                                FIN ELÉCTRICA                         #
// ########################################################################

const flowElectricaContac = addKeyword(['4', 'Contacto'])
    .addAnswer('Contactanos en : https://ingenierias.utp.edu.co/ingenieria-electrica/contacto/')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectricaUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowElectricaInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('Info:')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectricaPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/ingenieria-electrica/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectrica= addKeyword(['4', 'Ingeniería de Eléctrica', 'Eléctrica'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowElectricaPresentacion, flowElectricaInfo, flowElectricaUbi, flowElectricaContac]
    )

// ########################################################################
// #                                INICIO ELÉCTRICA                      #
// ########################################################################

// ########################################################################
// #                                FIN ELECTRÓNICA                       #
// ########################################################################

const flowElectronicaContac = addKeyword(['4', 'Contacto'])
    .addAnswer('Contactanos en : https://ingenierias.utp.edu.co/ingenieria-electronica/contacto/')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowElectronicaInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('Info:')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronicaPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/ingenieria-electronica/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowElectronica = addKeyword(['3', 'Ingeniería Electrónica', 'Electrónica'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowElectronicaPresentacion, flowElectronicaInfo, flowElectronicaUbi, flowElectronicaContac]
    )

// ########################################################################
// #                                INICIO ELECTRÓNICA                    #
// ########################################################################

// ########################################################################
// #                       FIN SISTEMAS - JORNADA ESPECIAL                #
// ########################################################################


const flowSistemasJContac = addKeyword(['4', 'Contacto'])
    .addAnswer('Contactanos en : ')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemasJUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowSistemasJInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('Info: ')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemasJPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/ingenieria-en-sistemas/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemasJ = addKeyword(['2', 'Ingeniería de Sistemas Jornada especial', 'Ingeniería de Sistemas y Computación - Jornada especial'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowSistemasJPresentacion, flowSistemasJInfo, flowSistemasJUbi, flowSistemasJContac]
    )

// ########################################################################
// #                    INICIO SISTEMAS - JORNADA ESPECIAL                #
// ########################################################################

// ########################################################################
// #                                FIN SISTEMAS                          #
// ########################################################################

const flowSistemasContac = addKeyword(['4', 'Contacto'])
    .addAnswer('Contactanos en : ')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemasUbi = addKeyword(['3', 'Ubicación', 'Ubi'])
    .addAnswer('Ubicación de la oficina: ')

const flowSistemasInfo = addKeyword(['2', 'Información General', 'Información'])
    .addAnswer('INfo: ')
    .addAnswer(
        [
            '👉 *1* - Sí, necesito ayuda en otro tema',
            '👉 *2* - No, gracias'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemasPresentacion = addKeyword(['1', 'Presentación del Programa', 'Presentación'])
    .addAnswer(
        [
            '*PRESENTACIÓN DEL PROGRAMA*\n',
            'Puedes encontrar información del programa en: https://ingenierias.utp.edu.co/ingenieria-en-sistemas/',
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowSistemas = addKeyword(['1', 'Ingeniería de Sistemas', 'Ingeniería de Sistemas y Computación'])
    .addAnswer(
        [
            '¿Podría indicarme qué información específica desea obtener?',
            '👉 *1* - Presentación del Programa',
            '👉 *2* - Información General',
            '👉 *3* - Ubicación',
            '👉 *4* - Contacto',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowSistemasPresentacion, flowSistemasInfo, flowSistemasUbi, flowSistemasContac]
    )

// ########################################################################
// #                                INICIO SISTEMAS                       #
// ########################################################################

const flowPregados = addKeyword(['1', 'pregrados'])
    .addAnswer(
        [
            'La Facultad ofrece programas de pregrado en:',
            '👉 *1* - Ingeniería de Sistemas y Computación',
            '👉 *2* - Ingeniería de Sistemas y Computación - Jornada especial',
            '👉 *3* - Ingeniería Electrónica',
            '👉 *4* - Ingeniería Eléctrica',
            '👉 *5* - Ingeniería Física',
            '👉 *6* - Tecnología en Desarrollo de Software',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowSistemas, flowSistemasJ, flowElectronica, flowFisica, flowElectrica, flowTecnologia]
    )

// ########################################################################
// #                                INICIO PREGRADO                       #
// ########################################################################
let prevFlow = null; // variable para almacenar el flujo anterior

const flowProgramas = addKeyword(['2', 'Programas', 'Programas académicos', 'carreras'])
    .addAnswer(
        [
            '👉 *1* - Pregados',
            '👉 *2* - Posgrados',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowPregados, flowPosgrados]  
    )

// ########################################################################
// #                              INICIO PROGRMAS                         #
// ########################################################################

// ########################################################################
// ########################################################################
// #                               FIN GENERALES                          #
// ########################################################################
// ########################################################################

// ########################################################################
// #                     INICIO BIENESTAR UNIVERSITARIO                   #
// ########################################################################


const flowPreguntas = addKeyword(['4', 'Preguntas Frecuentes', 'FAQ', 'ayuda'])
    .addAnswer(
        [
            'Puedes encontrar algunas preguntas frecuentes que te ayuden a resolver tus dudas en el siguiente enlace:',
            'https://www2.utp.edu.co/vicerrectoria/responsabilidad-social/preguntas-frecuentes.html',
            '👉 1 - ¿Necesitas ayuda en algo más?',
            '👉 2 - Gracias, eso es todo'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowPAI = addKeyword(['3', 'Programa de Acompañamiento Integral', 'PAI', 'apoyo emocional'])
    .addAnswer(
        [
            'Si requieres de acompañamiento integral PAI, puedes ingresar al siguiente enlace:',
            'https://www2.utp.edu.co/vicerrectoria/responsabilidad-social/pai.html',
            '👉 1 - ¿Necesitas ayuda en algo más?',
            '👉 2 - Gracias, eso es todo'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )

const flowApoyos = addKeyword(['2', 'Apoyos socioeconómicos', 'ayuda financiera'])
    .addAnswer(
        [
            'Si te interesa pertenecer al programa de apoyos socioeconómicos, ingresa al siguiente link:',
            'https://www2.utp.edu.co/vicerrectoria/responsabilidad-social/apoyos-socioeconomicos.html',
            '👉 1 - ¿Necesitas ayuda en algo más?',
            '👉 2 - Gracias, eso es todo'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )
const flowNoticias = addKeyword(['1', 'Portal de noticias', 'noticias', 'novedades'])
    .addAnswer(
        [
            'Para enterarte de las últimas noticias, eventos y novedades, ingresa al siguiente link:',
            'https://www2.utp.edu.co/vicerrectoria/responsabilidad-social/',
            '👉 1 - ¿Necesitas ayuda en algo más?',
            '👉 2 - Gracias, eso es todo'
        ],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
        }
    )


const flowBienestar = addKeyword(['5', 'Bienestar', 'Vida universitaria'])
    .addAnswer(
        [
            'La Vicerrectoría de Responsabilidad Social y Bienestar Universitario ofrece los siguientes servicios:',
            '👉 1 - Portal de noticias VRSBU.',
            '👉 2 - Apoyos socioeconómicos.',
            '👉 3 - Programa Acompañamiento Integral PAI.',
            '👉 4 - Preguntas Frecuentes VRSBU.',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowNoticias, flowApoyos, flowPAI, flowPreguntas]
    )

// ########################################################################
// #                      FIN BIENESTAR UNIVERSITARIO                     #
// ########################################################################

const flowFacultad = addKeyword(['1','Facultad', 'Facultad de Ingeniería', 'Cuéntame sobre la Facultad de Ingeniería'])
.addAnswer(
    [
        'La Facultad de Ingeniería es una de las más prestigiosas de la UTP y cuenta con un cuerpo docente altamente capacitado y una amplia experiencia en la industria.',
        'Los estudiantes de la Facultad tienen la oportunidad de participar en proyectos prácticos y programas de intercambio internacional, lo que les permite ampliar sus horizontes y adquirir una experiencia valiosa en su campo de estudio.',
        'La Facultad ofrece programas de pregrado en: Ingeniería de Sistemas y Computación, Ingeniería Electrónica, Ingeniería Eléctrica, Ingeniería Física y Tecnología en Desarrollo de Software. Además, cuenta con posgraorado posgrados como: Especialización en Electrónica Digital, Especialización en Tecnologías de la Información y las Comunicaciones, Maestría en Ingeniería de Sistemas y Computación, Maestría en Ingeniería Eléctrica y Doctorado en Ingeniería.',
        '',
        '*Más Información*: https://ingenierias.utp.edu.co'
    ],
    { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
    }
)

// ########################################################################
// #                               FIN INVESTIGACIÓN                      #
// ########################################################################

const flowInvGrupo = addKeyword(['2', 'Grupos'])
    .addAnswer(
        ['Información en : https://ingenierias.utp.edu.co/sin-categoria/grupos/'],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
        async (ctx, { flowDynamic, endFlow }) => {
            return flowDynamic(`Volviendo al Menu...`);
        }
    )



const flowInvSemi = addKeyword(['1', 'Semilleros'])
    .addAnswer(
        ['Información en : https://ingenierias.utp.edu.co/sin-categoria/semilleros/'],
        { capture: true, buttons: [{ body: 'Volver al Menu' }] },
        async (ctx, { flowDynamic, endFlow }) => {
            return flowDynamic(`Volviendo al Menu...`);
        }
    )



const flowInv = addKeyword(['4', 'Investigación'])
    .addAnswer(
        [
            '👉 *1* - Semilleros',
            '👉 *2* - Grupos',
        ],
        {capture: true, buttons: [{ body: 'Volver al Menu' }]},
        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == 'Volver al Menu')
             return endFlow({body: 'Volviendo al Menu...',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'Continuar' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
            })
        },
        [flowInvSemi, flowInvGrupo]
    )

// ##########################   ##############################################
// #                           INICIO INVESTIGACIÓN                       #
// ########################################################################

const flowRegla = addKeyword(['6','Reglamento estudiantil']).addAnswer(['Conocer las normas, beneficios, derechos y deberes cómo estudiantes es fundamental para nuestro proceso y no pasar malos ratos.\n Ingresa al siguiente link para conocer el reglamento estudiantil de la UTP: \n https://www2.utp.edu.co/secretaria/reglamentoestudiantil/'],
    { capture: true, buttons: [{ body: 'Volver al Menu' }] },
    async (ctx, { flowDynamic, endFlow }) => {
        return flowDynamic(`Volviendo al Menu...`);
    }
)

const flowRedes = addKeyword(['7','redes sociales', 'redes', '¿Cómo puedo visitar las redes sociales de la Facultad?']).addAnswer(['Para enterarte de ofertas laborales, prácticas, monitorías, charlas, te invitamos a seguir nuestras redes sociales en Facebook a través del enlace https://www.facebook.com/IngenieriasUTP y en Instagram a través de https://www.instagram.com/ingenieriasutp/ (@ingenieriasutp).'],
    { capture: true, buttons: [{ body: 'Volver al Menu' }] },
            async (ctx, { flowDynamic, endFlow }) => {
                return flowDynamic(`Volviendo al Menu...`);
    }
)

// ########################################################################
// ########################################################################
// #                              INICIO GENERALES                        #
// ########################################################################
// ########################################################################

const flowPrincipal = addKeyword(['menu','hola', 'buenas', 'hi', 'Volver', 'Volver al Menu', 'continuar'])
    .addAnswer(
        [
            '🙌 ¡Hola! Soy *DaVinci*, bienvenido/a a la Facultad de Ingeniería de la Universidad Tecnológica de Pereira. ¿En qué puedo ayudarte?',
            ' ',
            'Si mis respuestas no te satisfacen, puedes escribirnos a decanoingenierias@utp.edu.co.',
            '\n',
            '👉 *1* - Facultad de Ingeniería',
            '👉 *2* - Programas académicos',
            '👉 *3* - Admisión a la Facultad',
            '👉 *4* - Investigación',
            '👉 *5* - Beneficios Bienestar Universitario',
            '👉 *6* - Reglamento estudiantil',
            '👉 *7* - Redes sociales',
        ],
        null,
        null,
        [flowFacultad, flowProgramas, flowInv, flowBienestar, flowRegla, flowRedes]
    )



const flowGracias = addKeyword(['gracias', 'Gracias', 'adios'])
    .addAnswer('Gracias a ti')
    .addAnswer(
        [
            'Califica la experiencia en el siguiente link: ',
            'https://forms.office.com/r/bW85UMWVbc',
        ]
    )


const main = async () => {
    /*const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,Califica la experiencia
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })*/
    const adapterDB = new MockAdapter()// Escucha los eventos de mensajes del usuario
    const adapterFlow = createFlow([flowPrincipal, flowGracias])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()

    /*
    // Enviar mensaje desde el proveedor una vez que esté conectado y listo
    adapterProvider.on('ready', async () => {
        const messageOptions = {
            options: {
                // Aquí puedes especificar las opciones del mensaje, como los botones, los medios, etc.
            }
        };
        await adapterProvider.sendMessage('+XXXXXXXXXXX', 'Hello World', messageOptions);
    });
    */


}

main()
