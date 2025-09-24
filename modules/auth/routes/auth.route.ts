import { Router } from "express";
import { LogIn } from "../controllers/auth.controller";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
	LogIn(req, res);
});

export default router;
