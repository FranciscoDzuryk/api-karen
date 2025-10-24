import { Request, Response } from "express";
import Classes from "@modules/classes/models/class.models";

export const getClasses = async (req: Request, res: Response) => {
    try {
        const data = await Classes.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error al obtener las clases' });
    }
};

export const getClassById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const classItem = await Classes.findByPk(id);
        
        if (!classItem) {
            return res.status(404).json({ 
                ok: false, 
                message: 'Clase no encontrada' 
            });
        }
        
        res.json({ ok: true, data: classItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error al obtener la clase' });
    }
};

export const createClass = async (req: Request, res: Response) => {
    try {
        const newClass = await Classes.create(req.body);
        res.status(201).json({ ok: true, data: newClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error al crear la clase' });
    }
};

export const updateClass = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Classes.update(req.body, {
            where: { id }
        });
        
        if (!updated) {
            return res.status(404).json({ 
                ok: false, 
                message: 'Clase no encontrada' 
            });
        }
        
        const updatedClass = await Classes.findByPk(id);
        res.json({ ok: true, data: updatedClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error al actualizar la clase' });
    }
};

export const deleteClass = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Classes.destroy({
            where: { id }
        });
        
        if (!deleted) {
            return res.status(404).json({ 
                ok: false, 
                message: 'Clase no encontrada' 
            });
        }
        
        res.json({ ok: true, message: 'Clase eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error al eliminar la clase' });
    }
};
