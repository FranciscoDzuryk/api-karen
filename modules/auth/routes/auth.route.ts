import { Router } from "express";
import { logIn } from "../controllers/auth.controller";

const router = Router();

router.get('/login', logIn);

export default router;
