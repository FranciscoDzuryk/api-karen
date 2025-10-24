import { Request, Response, Router } from "express";
import { UserController } from "@modules/users/controllers/user.controller";

const router = Router();

router.get('/', UserController.getUsers);

router.post('/register', (req: Request, res: Response) => {
	UserController.registerUser(req, res);
});

router.post('/verify-code', (req: Request, res: Response) => {
	UserController.verifyCodeRegister(req, res);
});

router.post('/register-teacher', (req: Request, res: Response) => {
	UserController.registerProfesor(req, res);
});


export default router;