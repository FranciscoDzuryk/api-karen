import { Request, Response } from "express";
import Studentsubject from "../models/studentsubject.models";

export const getStudentsubjects = async (req: Request, res: Response) => {
    try {
        const data = await Studentsubject.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
