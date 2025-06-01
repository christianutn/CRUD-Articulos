import UsuarioControlador from '../controllers/usuario.controllers';
import { Router } from 'express';
import passport from "passport";
import autorizar from '../utils/autorizar';

const router = Router();
const usuarioControlador = new UsuarioControlador();
router.get('/', passport.authenticate('jwt', {session: false}), autorizar("admin"), usuarioControlador.obtenerUsuarios.bind(usuarioControlador));

export default router;