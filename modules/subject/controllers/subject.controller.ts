import { Request, Response } from "express";
import Subject from "../models/subject.models";

export const getSubjects = async (req: Request, res: Response) => {
    try {
        const data = await Subject.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
