const cron = require('node-cron');
const { enviarMensaje } = require('./mensaje.js');
const dotenv = require('dotenv');
const { GETDataAPI } = require('./clientes.js');

dotenv.config();

// const { TIME_CRON, CONTAC } = process.env;
const { TIME_CRON } = process.env;
var data = '';

// Parámetro variable para API
const pagina = '1';
const apiUrl = `http://localhost/apirest_php/clientes?page=${pagina}`;

async function main() {
    try {
        console.log('Data after:', data);
        const datosAPI = await GETDataAPI(apiUrl);
        data = datosAPI;
        console.log('Data Before:', data);
    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

// const CONTACTO = '51997694722@c.us'
const MSG_SALUDOS = 'Este es un mensaje de prueba de whatsapp.js, ahora consumiendo un API 😉🙃';

function programador_tareas(cliente) {

    // const tiempo = '0 00 11 * * *';
    if (cron.validate(TIME_CRON)) {

        const fechaHoraActual = new Date();

        const horas = fechaHoraActual.getHours();
        const minutos = fechaHoraActual.getMinutes();
        const segundos = fechaHoraActual.getSeconds();
        
        const horaFormateada = `${horas}:${minutos}:${segundos}`;

        console.log("Cron inicializado -> " + horaFormateada);
        cron.schedule(TIME_CRON, async () => {
            try {

                main();

                const fechaHoraActual = new Date();

                const horas = fechaHoraActual.getHours();
                const minutos = fechaHoraActual.getMinutes();
                const segundos = fechaHoraActual.getSeconds();
                
                const horaFormateada = `${horas}:${minutos}:${segundos}`;
                
                // // ARRAY
                // for (let i = 0; i < miArray.length; i++) {
                //     console.log(miArray[i]);
                //     const element = miArray[i] + '@c.us';
                //     // const saludo = MSG_SALUDOS[Math.floor(Math.random() * MSG_SALUDOS.length)];
                //     console.log('Element: ' + element);
                //     await enviarMensaje(cliente, element, MSG_SALUDOS);
                //     console.log('Mensaje enviado al número: ' + miArray[i]);
                // }

                // JSON
                for (const item of data) {
                    console.log("---------------"+ item.Id +"( " + horaFormateada + " )--------------");
                    const element = item.telefono + '@c.us';
                    console.log('Element: ' + element);
                    await enviarMensaje(cliente, element, MSG_SALUDOS);
                    console.log('Mensaje enviado a: ' + item.nombre);
                }

            } catch (error) {
                console.log('Error en cron', error);
            }
        });
    }
}

module.exports = {
    programador_tareas,
};