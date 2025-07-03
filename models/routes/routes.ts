import { Application } from 'express';
import userRoutes from '../../modules/users/routes/user.route';

const apiPrefix = process.env.API_PREFIX || '/api';


export const registerRoutes = (app: Application) => {
    app.use(`${apiPrefix}/users`, userRoutes);
};
