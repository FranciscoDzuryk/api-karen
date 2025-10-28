import { Request, Response, Router } from "express";
import { UserController } from "@modules/users/controllers/user.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

// Rutas públicas
router.post('/register', authenticateToken ,(req: Request, res: Response) => {
    UserController.registerUser(req, res);
});

router.post('/verify-code', (req: Request, res: Response) => {
    UserController.verifyCodeRegister(req, res);
});

router.post('/register-teacher', (req: Request, res: Response) => {
    UserController.registerProfesor(req, res);
});

// Rutas protegidas
router.get('/', authenticateToken, UserController.getUsers);


export default router;