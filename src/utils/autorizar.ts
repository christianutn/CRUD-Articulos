import { Request, Response, NextFunction } from "express";
import HttpError from "./httpError";

const autorizar = (rol: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && (req.user as any).rol === rol) {
            return next();
        }
        return next(new HttpError("No tienes permiso para acceder a este recurso", 403));
    };
};

export default autorizar;