import ArticuloControlador from "../controllers/articulo.controllers";
import passport from "passport";
import autorizar from "../utils/autorizar";

// Se agrega la función de autorizar para validar el rol autorizado para acceder a las rutas
// Se El usuario con legajo:100 tiene rol de admin, el usuario con legajo: 101 tiene otro rol

import { Router } from "express";

const router = Router();

const articuloControlador = new ArticuloControlador();

router.get("/", passport.authenticate('jwt', {session: false}), autorizar("admin"), articuloControlador.obtenerArticulos.bind(articuloControlador));
router.get("/:id", passport.authenticate('jwt', {session: false}), autorizar("admin"), articuloControlador.obtenerArticuloPorId.bind(articuloControlador));
router.delete("/:id", passport.authenticate('jwt', {session: false}), autorizar("admin"), articuloControlador.eliminarArticuloPorId.bind(articuloControlador));
router.put("/:id", passport.authenticate('jwt', {session: false}), autorizar("admin"), articuloControlador.actualizarArticuloPorId.bind(articuloControlador));
router.post("/", passport.authenticate('jwt', {session: false}), autorizar("admin"), articuloControlador.crearArticulo.bind(articuloControlador));

export default router;