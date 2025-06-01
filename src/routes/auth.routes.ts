import AuthControlador from '../controllers/auth.controllers';
import { Router } from 'express';
import passport from 'passport';
import limitarIntentos from '../utils/limitarIntentos';

const router = Router();

const authControlador = new AuthControlador();

// Ruta para el login
router.post('/login', limitarIntentos, passport.authenticate('login', {session: false}), authControlador.login.bind(authControlador));


export default router;