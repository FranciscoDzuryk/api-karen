import { Router } from "express";
import { getUsuarios } from "../controllers/user.controller";



const router = Router();

router.get('/', getUsuarios);

export default router;
