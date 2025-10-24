import { Request, Response } from "express";
import { Op } from "sequelize";
import Message, { IMessageInstance } from "../models/message.models";
import { db } from "@models/database/dbConnection";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string | number;
                email: string;
                [key: string]: any;
            };
        }
    }
}

/**
 * Obtiene todos los mensajes del usuario autenticado
 */
export const getMessages = async (req: Request, res: Response) => {
    try {
        console.log('Iniciando getMessages...');

        if (!req.user) {
            console.error('Usuario no autenticado');
            return res.status(401).json({
                ok: false,
                message: 'No autorizado. Se requiere autenticación.'
            });
        }

        const userId = req.user.id;
        console.log(`Usuario autenticado ID: ${userId}`);

        try {
            await db.authenticate();
            console.log('Conexión a la base de datos exitosa');
        } catch (dbError: any) {
            console.error('Error al conectar a la base de datos:', dbError);
            return res.status(500).json({
                ok: false,
                message: 'Error de conexión a la base de datos',
                error: dbError.message,
                details: process.env.NODE_ENV === 'development' ? dbError : undefined
            });
        }

        try {
            console.log('Buscando mensajes...');
            const messages = await (Message as any).findAll({
                where: {
                    [Op.or]: [
                        { sender_id: userId },
                        { receiver_id: userId }
                    ]
                },
                order: [['created_at', 'DESC']]
            });

            console.log(`Se encontraron ${messages.length} mensajes`);

            return res.json({
                ok: true,
                data: messages
            });

        } catch (error: any) {
            console.error('Error al obtener mensajes:', error);
            return res.status(500).json({
                ok: false,
                message: 'Error al obtener los mensajes',
                error: error.message,
                details: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }

    } catch (error: any) {
        console.error('Error inesperado en getMessages:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error inesperado al procesar la solicitud',
            error: error.message || 'Error desconocido',
            ...(process.env.NODE_ENV === 'development' && {
                details: {
                    name: error.name,
                    stack: error.stack
                }
            })
        });
    }
};

/**
 * Envía un nuevo mensaje
 */
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { receiver_id, content } = req.body;
        const sender_id = req.user?.id;

        if (!sender_id) {
            return res.status(401).json({
                ok: false,
                message: 'No autorizado. Usuario no autenticado.'
            });
        }

        if (!receiver_id || !content) {
            return res.status(400).json({
                ok: false,
                message: 'Los campos receiver_id y content son obligatorios'
            });
        }

        const message = await (Message as any).create({
            sender_id,
            receiver_id,
            content,
            is_read: false
        });

        return res.status(201).json({
            ok: true,
            message: 'Mensaje enviado correctamente',
            data: message
        });

    } catch (error: any) {
        console.error('Error al enviar mensaje:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al enviar el mensaje',
            error: error.message,
            ...(process.env.NODE_ENV === 'development' && {
                details: {
                    name: error.name,
                    stack: error.stack
                }
            })
        });
    }
};

/**
 * Marca un mensaje como leído
 */
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                ok: false,
                message: 'No autorizado. Usuario no autenticado.'
            });
        }

        const message = await (Message as any).findOne({
            where: {
                id: messageId,
                receiver_id: userId
            }
        });

        if (!message) {
            return res.status(404).json({
                ok: false,
                message: 'Mensaje no encontrado o no tienes permiso para marcarlo como leído'
            });
        }

        await message.update({ is_read: true });

        return res.json({
            ok: true,
            message: 'Mensaje marcado como leído',
            data: message
        });

    } catch (error: any) {
        console.error('Error al marcar mensaje como leído:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al actualizar el estado del mensaje',
            error: error.message,
            ...(process.env.NODE_ENV === 'development' && {
                details: {
                    name: error.name,
                    stack: error.stack
                }
            })
        });
    }
};
