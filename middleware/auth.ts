import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@utils/jwt';

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

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    const { id, email, ...rest } = decoded;
    req.user = {
      id,
      email,
      ...rest
    };

    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(500).json({ message: 'Error al autenticar el token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Acceso denegado. Se requiere uno de estos roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};