import BaseDatosConfig from "./config/bd";
import crearDatosPrueba from "./utils/crearDatosPrueba";
import Articulo from "./models/articulo.models";
import Usuario from "./models/usuario.models";
import express from "express";
import indiceRouter from "./routes/indice.routes";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import HttpError from "./utils/httpError";
import inicializarPassport from './config/passport';



const iniciarAplicacion = async () => {
  try {
    dotenv.config();
    const app = express();
    const PORT = process.env.PORT;

    // Inicializamos passport 
    inicializarPassport();

    //Middlewares
    app.use(express.json());
    app.use('/api', indiceRouter);

    // Middleware para manejar errores generales
    app.use((err : HttpError, req : Request, res : Response, next : NextFunction) => {
      console.log("INFO ERROR: ", {
        message: err.message || err,
        url: req.originalUrl,
        method: req.method,
        code: err.statusCode || 500,
      });
      res.status(err.statusCode || 500).json({ message: err.message || "Error Interno" });
    });



    // Inicializar la base de datos
    const db = BaseDatosConfig.obtenerInstancia();
    await db.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    // Sincronizar modelos
    await Articulo.sync({ force: true });
    await Usuario.sync({ force: true });

    // Crear datos de prueba
    await crearDatosPrueba();
    console.log("Datos de prueba creados correctamente.");

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar la aplicación:", error
    );
  }
};

iniciarAplicacion();




