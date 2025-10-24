import { Request, Response } from "express";
import Classes from "@modules/classes/models/class.models";

export const getClasses = async (req: Request, res: Response) => {
    try {
        const data = await Classes.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
