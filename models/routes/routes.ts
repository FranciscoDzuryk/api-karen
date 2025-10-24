import { Application, Router } from 'express';
import userRoutes from '@modules/users/routes/user.route';
import authRoutes from '@modules/auth/routes/auth.route';
import assistsRoutes from '@modules/assists/routes/assists.route';
import classRoutes from '@modules/classes/routes/class.route';
import messageRoutes from '@modules/message/routes/message.route';
import studentSubjectRoutes from '@modules/studentsubject/routes/studentsubject.route';
import subjectRoutes from '@modules/subject/routes/subject.route';

const apiPrefix = process.env.API_PREFIX || '/api';

export const registerRoutes = (app: Application) => {
    console.log('Registrando rutas...');
    
    const apiRouter = Router();
    
    apiRouter.use('/auth', authRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/auth`);
    
    apiRouter.use('/users', userRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/users`);
    
    apiRouter.use('/assists', assistsRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/assists`);
    
    apiRouter.use('/classes', classRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/classes`);
    
    apiRouter.use('/messages', messageRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/messages`);
    
    apiRouter.use('/student-subjects', studentSubjectRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/student-subjects`);
    
    apiRouter.use('/subjects', subjectRoutes);
    console.log(`Ruta registrada: ${apiPrefix}/subjects`);
    
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
                    `GET  ${apiPrefix}/users`,
                    
                    `GET  ${apiPrefix}/assists`,
                    
                    `GET    ${apiPrefix}/classes`,
                    `GET    ${apiPrefix}/classes/:id`,
                    `POST   ${apiPrefix}/classes`,
                    `PUT    ${apiPrefix}/classes/:id`,
                    `DELETE ${apiPrefix}/classes/:id`,
                    
                    `GET  ${apiPrefix}/messages`,
                    
                    `GET  ${apiPrefix}/student-subjects`,
                    
                    `GET  ${apiPrefix}/subjects`
                ]
            });
        } else {
            next();
        }
    });
};
