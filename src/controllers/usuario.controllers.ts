import { Request, Response, NextFunction } from 'express';
import Usuario from '../models/usuario.models';

/* 
    Se implementa a fines prácticos para visualizar por postman la creación de los usuarios con sus contraseñas encriptadas.
*/
class UsuarioControlador {
  // Método para obtener todos los usuarios
  async obtenerUsuarios(req : Request, res : Response, next : NextFunction): Promise<void> {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioControlador;