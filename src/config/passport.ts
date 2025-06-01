import passport from 'passport';
import passportLocal from 'passport-local';
import Usuario from '../models/usuario.models';
import { validatePassword } from "../utils/bcrypt";
import jwt from 'passport-jwt';
import { Request } from 'express';
import dotenv from 'dotenv';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const inicializarPassport = () => {
    dotenv.config();

    // Validamos datos para evitar problemas en compilación o errores en tiempo de ejecución
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }

    // Extrae el token JWT del header Authorization
    const cookieExtractor = (req: Request): string => {
        let token = req.headers.authorization ? req.headers.authorization : '';
        if (typeof token === 'string' && token.startsWith('Bearer ')) {
            token = token.slice(7);
        }
        
        return token;
    };

    // Estrategia JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: jwtSecret
    }, async (jwt_payload, done) => {
        try {
            
            return done(null, jwt_payload);
        } catch (error) {
            
            return done(error);
        }
    }));

    // Estrategia Local para login
    passport.use("login", new LocalStrategy({
        usernameField: 'legajo',      
        passwordField: 'contrasena',  
        passReqToCallback: true
    }, async function (req: Request, legajo: string, contrasena: string, done) {
        try {
            const usuario = await Usuario.findByPk(legajo);
            if (!usuario) {
                return done(null, false);
            }
            if (!validatePassword(String(contrasena), usuario.contrasena)) {
                return done(null, false);
            }
            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }));
};

export default inicializarPassport;