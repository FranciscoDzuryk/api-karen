import { Request, Response } from "express";
import User from "@modules/users/models/user.models";
import Teacher from "@modules/teachers/models/teacher.model";
import Student from "@modules/students/models/student.model";
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
    const { name, lastname, email, password, user_type } = req.body;

    // Validaciones mínimas
    if (!name || !lastname || !email || !password || !user_type) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, apellido, email, contraseña y tipo de usuario' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'El correo electrónico no es válido' });
    }

    if (user_type !== 'teacher' && user_type !== 'student') {
      return res.status(400).json({ error: 'Tipo de usuario inválido: debe ser "teacher" o "student"' });
    }

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Correo electrónico ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      code_register: Math.floor(100000 + Math.random() * 900000).toString(),
      code_recovery: '',
      user_status_id: 1,
    });

    // Crear registro en tabla correspondiente
    if (user_type === 'teacher') {
      await Teacher.create({ user_id: newUser.getDataValue('id') });
    } else {
      await Student.create({ user_id: newUser.getDataValue('id') });
    }

    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
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
      code_register: '',
      user_status_id: 2
    });

    return res.status(200).json({ message: 'Código verificado correctamente' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};