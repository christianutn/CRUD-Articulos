import 'dotenv/config'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export interface TokenPayload {
    legajo: string;
    nombre: string;
    rol: string;
}

const generarToken = (payload: TokenPayload) => {
    try {
        dotenv.config();
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

        return token;
    } catch (error) {
        throw new Error("Error al generar el token");
    }
}

export default generarToken;