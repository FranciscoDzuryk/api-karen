import { Application, Router } from 'express';
import userRoutes from '../../modules/users/routes/user.route';
import authRoutes from '../../modules/auth/routes/auth.route';

const apiPrefix = process.env.API_PREFIX || '/api';

export const registerRoutes = (app: Application) => {
    console.log('Registrando rutas...');
    
    const apiRouter = Router();
    
    apiRouter.use('/auth', authRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/auth`);
    
    apiRouter.use('/users', userRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/users`);
    
    app.use(apiPrefix, apiRouter);
    
    // Middleware para rutas no encontradas
    app.use((req, res, next) => {
        if (!res.headersSent) {
            console.log(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
            res.status(404).json({ 
                message: 'Ruta no encontrada',
                path: req.path,
                method: req.method,
                availableRoutes: [
                    `POST ${apiPrefix}/auth/login`,
                    `POST ${apiPrefix}/users/register`,
                    `POST ${apiPrefix}/users/verify-code`,
                    `POST ${apiPrefix}/users/register-teacher`,
                    `GET ${apiPrefix}/users`
                ]
            });
        } else {
            next();
        }
    });
};
