import { Router } from "express";
import { getClasses } from "../controllers/classe.controller";

const router = Router();

router.get('/', getClasses);

export default router;
