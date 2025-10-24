import { Request, Response } from "express";
import User from "@modules/users/models/user.models";
import Teacher from "@modules/teacher/models/teacher.model";
import Student from "@modules/student/models/students.model";
import Subject from "@modules/subject/models/subject.models";
import bcrypt from 'bcryptjs';
import Studentsubject from "@modules/studentsubject/models/studentsubject.models";

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

    if (!name || !lastname || !email || !password || !user_type) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, apellido, email, contraseña y tipo de usuario' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'El correo electrónico no es válido' });
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

    const newStudent = await Student.create(
    { 
      user_id: newUser.getDataValue('id'),  
    });

    const firstSubject = await Subject.findOne({ order: [['id', 'ASC']] });

    if (!firstSubject) {
      throw new Error('No se encontró ninguna materia en la base de datos');
    }

    await Studentsubject.create({
      student_id: newStudent.getDataValue('id') as number,
      subject_id: firstSubject.getDataValue('id') as number,
      status: 1
    });

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


export const registerProfesor = async (req: Request, res: Response) => {
  try {
    const name = 'Francisco';
    const lastname = 'Dzuryk';
    const email = 'profesor@gmail.com';
    const password = 'Profesor2025!';

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Correo electrónico ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      code_register: '',
      code_recovery: '',
      user_status_id: 2,
    });

    await Teacher.create({ user_id: newUser.getDataValue('id') });
    
    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};