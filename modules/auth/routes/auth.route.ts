import { Router, Request, Response, NextFunction } from "express";
import { LogIn } from "@modules/auth/controllers/auth.controller";

const router = Router();

router.route('/login')
    .post((req: Request, res: Response) => {
        LogIn(req, res);
    })
    .all((req: Request, res: Response) => {
        res.set('Allow', 'POST');
        res.status(405).json({
            message: 'Método no permitido',
            allowedMethods: ['POST']
        });
    });

export default router;
