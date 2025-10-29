import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import logger from "@models/logger/logger";
import User from "@modules/users/models/user.models";
import UserStatus from "@modules/users/models/userStatus.models";
import { generateToken } from "@utils/jwt";
import { IUser } from "@modules/users/interfaces/IUser";

export const LogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Intento de login para:', email);
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        // Buscar el usuario sin cargar relaciones primero
        const user = await User.findOne({
            where: { email },
            raw: true,
            nest: true
        }) as unknown as IUser;
        
        if (!user) {
            logger.error(`Intento de login fallido: usuario no encontrado (${email})`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        
        // Obtener el estado del usuario por separado
        const userStatus = await UserStatus.findByPk(user.user_status_id);
        
        if (!userStatus) {
            logger.error(`Estado de usuario no encontrado para el usuario: ${user.id}`);
            return res.status(500).json({ message: "Error en la configuración del usuario" });
        }
        
        // Verificar la contraseña
        const passwordValid = await bcrypt.compare(password, user.password);
        
        if (!passwordValid) {
            logger.error(`Intento de login fallido: Contraseña incorrecta para el usuario ${email}`);
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Mostrar información de depuración
        console.log('Estado del usuario:', {
            userId: user.id,
            userStatusId: user.user_status_id,
            statusName: userStatus.get('name'),
            statusData: userStatus.get()
        });

        // Verificar si el usuario está habilitado
        const statusName = userStatus.get('name');
        if (statusName && typeof statusName === 'string' && statusName.toLowerCase() !== 'enabled') {
            logger.error(`Intento de login fallido: El usuario (${email}) no está habilitado. Estado actual: ${statusName}`);
            return res.status(403).json({ 
                message: "Su cuenta no está habilitada",
                currentStatus: statusName,
                statusId: user.user_status_id
            });
        }

        // Generar token
        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name
        });

        // Devolver respuesta exitosa
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: userStatus.get('name')
            }
        });
        
    } catch (error: any) {
        console.error("Error en login:", error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        logger.error(`Error en el servidor durante el login: ${errorMessage}`);
        res.status(500).json({ 
            message: "Error en el servidor",
            error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
    }
};