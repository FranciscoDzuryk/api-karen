import { Router } from "express";
import { getAssists } from "../controllers/assists.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.get('/', authenticateToken, getAssists);

export default router;
