import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json({ ok: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, password, user_status_id } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, apellido, email y contraseña' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'El correo electrónico no es válido' });
    }

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Correo electrónico ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      active: 1,
      code_register: Math.floor(100000 + Math.random() * 900000).toString(),
      code_recovery: null,
      user_status_id: 1,
    });

    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const verifyCodeRegister = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'email y código son requeridos' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.getDataValue('code_register') !== code) {
      return res.status(400).json({ error: 'Código incorrecto' });
    }

    await user.update({
      code_register: null,
      user_status_id: 2
    });

    return res.status(200).json({ message: 'Código verificado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



