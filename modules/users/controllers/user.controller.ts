import { Request, Response } from "express";
import User from "../models/user.models";

export const getUsuarios = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json({ ok: true, data: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error' });
    }
  };
  
  
