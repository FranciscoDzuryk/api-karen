import { Request, Response } from "express";
import Assists from "../models/assists.models";

export const getAssists = async (req: Request, res: Response) => {
    try {
        const data = await Assists.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
