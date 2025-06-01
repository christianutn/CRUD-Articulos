import { Router } from "express";
import ArticuloRouter from "./articulo.routes";
import UsuarioRouter from "./usuario.routes";
import AuthRouter from "./auth.routes";


const router = Router();

// Rutas de artículos
router.use("/articulos", ArticuloRouter);
router.use("/usuarios", UsuarioRouter);
router.use("/auth", AuthRouter);

export default router