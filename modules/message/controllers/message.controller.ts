import { Request, Response } from "express";
import Message from "../models/message.models";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const data = await Message.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
