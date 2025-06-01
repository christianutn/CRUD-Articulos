import generarToken from '../utils/generarToken'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../utils/httpError'
import Usuario from '../models/usuario.models';

class AuthControlador {

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const usuario = req.user as any;
            if (!usuario || !usuario.legajo || !usuario.nombre || !usuario.rol) {
                throw new HttpError("Usuario o contraseña incorrectos", 401);
            }

            interface UsuarioPayload {
                legajo: string;
                nombre: string;
                rol: string;
            }

            // Solo los datos necesarios para el token
            const payload: UsuarioPayload = {
                legajo: usuario.legajo,
                nombre: usuario.nombre,
                rol: usuario.rol
            };

            const token = generarToken(payload);

            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthControlador;

