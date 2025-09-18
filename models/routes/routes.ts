import { Application } from 'express';
import userRoutes from '../../modules/users/routes/user.route';
import authRoutes from '../../modules/auth/routes/auth.route';

const apiPrefix = process.env.API_PREFIX || '/api';


export const registerRoutes = (app: Application) => {
    app.use(`${apiPrefix}/auth`, authRoutes );
    app.use(`${apiPrefix}/users`, userRoutes);
};
