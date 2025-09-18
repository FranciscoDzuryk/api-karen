import { Router } from "express";
import { LogIn } from "../controllers/auth.controller";

const router = Router();

router.get('/login', LogIn);

export default router;
