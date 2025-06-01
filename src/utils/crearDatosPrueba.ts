import Articulo from "../models/articulo.models";
import Usuario from "../models/usuario.models";
import { createHash } from "../utils/bcrypt";

const crearDatosPrueba = async () => {
    try {

        // Creamos en memoria los datos de artículo para probar
        const articulos = [
            {
                nombre: "Laptop Gamer Pro X15",
                fechaModificacion: new Date("2024-05-15T10:30:00Z"),
                marca: "ROG Strix",
                estadoActivacion: false,
            },
            {
                nombre: "Smartphone Galaxy S25 Ultra",
                fechaModificacion: new Date("2024-05-20T14:00:00Z"),
                marca: "Samsung",
                estadoActivacion: true,
            },
            {
                nombre: "Auriculares Inalámbricos QuietComfort 55",
                fechaModificacion: new Date("2024-04-28T09:15:00Z"),
                marca: "Bose",
                estadoActivacion: true,
            },
            {
                nombre: "Monitor Curvo Ultrawide 34 pulgadas",
                fechaModificacion: new Date("2024-05-02T11:00:00Z"),
                marca: "LG",
                estadoActivacion: false, // Ejemplo de inactivo
            },
            {
                nombre: "Teclado Mecánico RGB K95 Platinum",
                fechaModificacion: new Date("2024-05-10T16:45:00Z"),
                marca: "Corsair",
                estadoActivacion: true,
            },
            {
                nombre: "Smartwatch Series 10",
                fechaModificacion: new Date("2024-05-22T08:00:00Z"),
                marca: "Apple",
                estadoActivacion: true,
            },
            {
                nombre: "Cámara Mirrorless Alpha a7 IV",
                fechaModificacion: new Date("2024-03-15T13:20:00Z"),
                marca: "Sony",
                estadoActivacion: true,
            },
            {
                nombre: "Router WiFi 6 AX6000",
                fechaModificacion: new Date("2024-05-05T10:10:00Z"),
                marca: "TP-Link",
                estadoActivacion: true,
            },
            {
                nombre: "Impresora Multifuncional EcoTank L3250",
                fechaModificacion: new Date("2024-04-10T17:00:00Z"),
                marca: "Epson",
                estadoActivacion: false, // Ejemplo de inactivo
            },
            {
                nombre: "Disco Duro Externo SSD 2TB",
                fechaModificacion: new Date("2024-05-18T12:30:00Z"),
                marca: "SanDisk",
                estadoActivacion: true,
            },
            {
                nombre: "Tablet ProTab 11 Gen 3",
                fechaModificacion: new Date("2024-05-01T19:00:00Z"),
                marca: "Lenovo",
                estadoActivacion: true,
            },
            {
                nombre: "Mouse Gamer G502 Hero",
                fechaModificacion: new Date("2024-05-08T11:55:00Z"),
                marca: "Logitech",
                estadoActivacion: true,
            },
            {
                nombre: "Tarjeta Gráfica RTX 4080 Super",
                fechaModificacion: new Date("2024-02-20T15:00:00Z"),
                marca: "Nvidia",
                estadoActivacion: true,
            },
            {
                nombre: "Proyector Portátil Full HD P5",
                fechaModificacion: new Date("2024-04-22T18:20:00Z"),
                marca: "Anker",
                estadoActivacion: true,
            },
            {
                nombre: "Silla Gamer Ergonómica Titan Evo",
                fechaModificacion: new Date("2024-05-12T09:00:00Z"),
                marca: "Secretlab",
                estadoActivacion: true,
            },
            {
                nombre: "Consola de Videojuegos PS5 Slim",
                fechaModificacion: new Date("2024-05-25T10:00:00Z"),
                marca: "Sony",
                estadoActivacion: true,
            },
            {
                nombre: "Altavoz Inteligente Echo Dot 5ta Gen",
                fechaModificacion: new Date("2024-05-03T13:40:00Z"),
                marca: "Amazon",
                estadoActivacion: true,
            },
            {
                nombre: "Webcam Profesional C922 Pro Stream",
                fechaModificacion: new Date("2024-03-01T16:00:00Z"),
                marca: "Logitech",
                estadoActivacion: false,
            },
            {
                nombre: "Mochila Antirrobo para Laptop 17 pulgadas",
                fechaModificacion: new Date("2024-05-19T11:15:00Z"),
                marca: "XD Design",
                estadoActivacion: true,
            },
            {
                nombre: "Robot Aspirador Roomba j7+",
                fechaModificacion: new Date("2024-05-07T14:30:00Z"),
                marca: "iRobot",
                estadoActivacion: true,
            }
        ];
        await Articulo.bulkCreate(articulos);

        // Creamos en memoria dos usuarios para probar la seguridad en las rutas
        const usuarios = [
            { legajo: "100", nombre: "admin", rol: "admin", contrasena: createHash("1234") },
            { legajo: "101", nombre: "user", rol: "user", contrasena: createHash("5678") },
        ];
        await Usuario.bulkCreate(usuarios);

    } catch (error) {
        throw new Error(`Error al crear datos de prueba: ${error}`);
    }
}

export default crearDatosPrueba;