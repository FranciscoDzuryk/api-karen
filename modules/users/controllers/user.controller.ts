import { Request, Response } from 'express';
import { UserService } from '@modules/users/services/user.service';

export class UserController {

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json({ ok: true, data: users });
    } catch (error: any) {
      res.status(500).json({ ok: false, message: 'Error' });
    }
  }

  static async registerUser(req: Request, res: Response) {
    try {
      const newUser = await UserService.createStudentUser(req.body);
      res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async registerProfesor(req: Request, res: Response) {
    try {
      const { name, lastname, email, password } = req.body; // ahora configurable desde body
      const newUser = await UserService.createTeacherUser({ name, lastname, email, password });
      res.status(201).json({ message: 'Profesor registrado correctamente', user: newUser });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async verifyCodeRegister(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const user = await UserService.verifyRegisterCode(email, code);
      res.status(200).json({ message: 'Código verificado correctamente', user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
}
