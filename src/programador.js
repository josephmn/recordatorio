const cron = require('node-cron');
const { enviarMensaje } = require('./mensaje.js');
const dotenv = require('dotenv');
const { GETDataAPI } = require('./clientes.js');

dotenv.config();

// const { TIME_CRON, CONTAC } = process.env;
const { TIME_CRON } = process.env;
var hora_actual = "";
var data = "";

// Parámetro variable para API
const pagina = '1';
const apiUrl = `http://localhost/apirest_php/clientes?page=${pagina}`;

function imprimirHoraActual() {
    const fechaHoraActual = new Date();
    const horas = fechaHoraActual.getHours();
    const minutos = fechaHoraActual.getMinutes();
    const segundos = fechaHoraActual.getSeconds();
    return `${horas}:${minutos}:${segundos}`;
};

function programador_tareas(cliente) {

    // Verifica si el cron se valida con éxito
    if (!cron.validate(TIME_CRON)) {
        return;
    }

    // Imprime la hora actual
    hora_actual = imprimirHoraActual();
    console.log("Cron iniciado: " + hora_actual);

    // Programa el cron
    cron.schedule(TIME_CRON, async () => {
        try {
            // Imprime la hora actual dentro del cron
            hora_actual = imprimirHoraActual();
            
            // Traemos los datos del API
            data = await GETDataAPI(apiUrl);
            
            // Iteramos la data
            for (const item of data) {
                const element = item.telefono + '@c.us';
                const MSG_SALUDOS = `Hola ${item.nombre}, este mensaje de prueba es de whatsapp.js, ahora consumiendo un API para Obtener los clientes y números desde la BD MySQL 👍 ... ✌️✌️✌️`;
                console.log(`---------${item.Id}: ( ${hora_actual} )---------`);
                console.log('Element: ' + element);
                await enviarMensaje(cliente, element, MSG_SALUDOS);
                console.log('Mensaje enviado a: ' + item.nombre);
                console.log(`------------------------------------------------`);
            }
            
        } catch (error) {
            console.log('Error en cron', error);
        }
    });
}

module.exports = {
    programador_tareas,
};