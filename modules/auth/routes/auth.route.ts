import { Router } from "express";
import { LogIn }  from "@modules/auth/controllers/auth.controller";

import { Request, Response } from "express";

const router = Router();

router.post('/login', (req: Request, res: Response) => {
	LogIn(req, res);
});

export default router;
