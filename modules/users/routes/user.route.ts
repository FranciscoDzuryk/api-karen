import { Request, Response, Router } from "express";
import { getUsuarios, registerUser,verifyCodeRegister } from "@modules/users/controllers/user.controller";

const router = Router();

router.get('/', getUsuarios);
router.post('/register', (req: Request, res: Response) => {
	registerUser(req, res);
});
router.post('/verify-code', (req: Request, res: Response) => {
	verifyCodeRegister(req, res);
});

export default router;