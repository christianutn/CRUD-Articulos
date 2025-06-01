
import { Request, Response, NextFunction } from 'express';
import  Articulo  from '../models/articulo.models';
import { Op } from 'sequelize';
import HttpError from '../utils/httpError';
class ArticuloControlador {
 
    // Método para obtener todos los artículos y filtrar por nombre, estado de activación e ID
    public async obtenerArticulos(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        const nombre = typeof req.query.nombre === "string" ? req.query.nombre : undefined;
        const estadoActivacion = typeof req.query.estadoActivacion === "string" ? req.query.estadoActivacion : undefined;
        
        // estadoActivacion es distinto de t

        if (estadoActivacion && estadoActivacion !== 'true' && estadoActivacion !== 'false') {
            throw new HttpError('El estado de activación debe ser "true" o "false"', 400);
        }   
        // Buscamos todos los articulos en la base de datos
        const articulos = await Articulo.findAll(
            {
                where: {
                    [Op.and]: [
                        nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : {},
                        estadoActivacion ? { estadoActivacion: estadoActivacion === 'true' } : {},
                    ]
                   
                },
            }
        );

        // Validamos que exista al menos un artículo
        if (articulos.length === 0) {
            throw new HttpError('No se encontraron artículos', 404);
        }

        // Si hay artículos, los devolvemos en la respuesta
        res.status(200).json(articulos);

        } catch (error) {
            next(error);
        }
    }

    // Buscamos articulos por id

    public async obtenerArticuloPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const articulo = await Articulo.findByPk(id);
           
            if (!articulo) {
                throw new HttpError('Artículo no encontrado', 404);;
            }
            res.status(200).json(articulo);
        } catch (error) {
            next(error);
        }
    }

    
    public async eliminarArticuloPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const articulo = await Articulo.findByPk(id);
           
            if (!articulo) {
                throw new HttpError('Artículo no encontrado', 404);
            }

            // validamos estado del articulo
            if (!articulo.estadoActivacion) {
                throw new HttpError('El artículo ya está eliminado', 400);
            }

            // Cambiamos el estado de activación a false
            articulo.estadoActivacion = false;
            await articulo.save();
            res.status(200).json({ mensaje: 'Artículo eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }

   public async actualizarArticuloPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const { nombre, marca, estadoActivacion } = req.body;

            // Validamos que el artículo exista
            const articulo = await Articulo.findByPk(id);
            if (!articulo) {
                throw new HttpError('Artículo no encontrado', 404);
            }

            // Actualizamos los campos del artículo
            articulo.nombre = nombre || articulo.nombre;
            articulo.marca = marca || articulo.marca;
            articulo.estadoActivacion = estadoActivacion !== undefined ? estadoActivacion : articulo.estadoActivacion;
            articulo.fechaModificacion = new Date(); 

            await articulo.save();
            res.status(200).json({ mensaje: 'Artículo actualizado correctamente', articulo });
        } catch (error) {
            next(error);
        }
    }


    public async crearArticulo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre, marca } = req.body;

            // Validamos que los campos requeridos estén presentes
            if (!nombre || !marca) {
                throw new HttpError('Los campos nombre y marca son obligatorios', 400);
            }

            // obtenenemos fecha de modificación actual
            const fechaModificacion = new Date();
            // Creamos un nuevo artículo
            const nuevoArticulo = await Articulo.create({
                nombre,
                marca,
                fechaModificacion,
                estadoActivacion: true 
            });
            res.status(201).json({ mensaje: 'Artículo creado correctamente', articulo: nuevoArticulo });
        } catch (error) {
            next(error);
        }
    }
}


export default ArticuloControlador;