import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import logger from "@models/logger/logger";
import User from "@modules/users/models/user.models";
import UserStatus from "@modules/users/models/userStatus.models";
import { generateToken } from "@utils/jwt";

export const LogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Intento de login para:', email);
        
        const user = await User.findOne({
            where: { email },
            include: [{ model: UserStatus, as: "status" }]
        });
        
        console.log('Usuario encontrado en DB:', JSON.stringify(user?.get({ plain: true }), null, 2));
        
        if (!user) {
            logger.error(`Intento de login fallido: usuario no encontrado (${email})`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        
        const userPlain = user.get({ plain: true });
        const passwordHash = user.getDataValue('password');
        console.log('Hash de contraseña en DB:', passwordHash);
        
        const passwordValid = await bcrypt.compare(password, passwordHash);
        console.log('Resultado de comparación de contraseña:', passwordValid);
        
        if (!passwordValid) {
            logger.error(`Intento de login fallido: Contraseña invalida`);
            return res.status(401).json({ 
                message: "Credenciales inválidas",
                debug: {
                    providedPassword: password,
                    storedHash: passwordHash
                }
            });
        }

        const status = (user as any).status?.get ? (user as any).status.get('name') : (user as any).status?.name;
        if (status && status !== "Habilitado") {
            logger.error(`Intento de login fallido: El usuario (${email}) no se encuentra Habilitado.`);
            return res
                .status(403)
                .json({ message: "Credenciales inválidas" });
        }

        res.status(200).json({
            message: "Login exitoso",
            token: generateToken({
                id: user.get("id"),
                email: user.get("email"),
                name: user.get("name")
            }),
            user: {
                id: user.get("id"),
                name: user.get("name"),
                email: user.get("email"),
                status: (user as any).status.name
            }
    });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error en el servidor", error });
  }
};