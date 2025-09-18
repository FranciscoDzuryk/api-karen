import { Router } from "express";
import { LogIn } from "../controllers/auth.controller";

const router = Router();

router.post('/login', LogIn);

export default router;
