import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import logger from "@models/logger/logger";
import User from "@modules/users/models/user.models";
import UserStatus from "@modules/users/models/userStatus.models";

export const LogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
            include: [{ model: UserStatus, as: "status" }]
        });
        
        if (!user) {
            logger.error(`Intento de login fallido: usuario no encontrado (${email})`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const passwordHash = String(user.get("password"));
        const passwordValid = await bcrypt.compare(password, passwordHash);
        if (!passwordValid) {
            logger.error(`Intento de login fallido: Contraseña invalida.`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        if (user.get("status") && (user as any).status.name !== "Habilitado") {
            logger.error(`Intento de login fallido: El usuario (${email}) no se encuentra Habilitado.`);
            return res
                .status(403)
                .json({ message: "Credenciales inválidas" });
        }

        res.status(200).json({
            message: "Login exitoso",
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