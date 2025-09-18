import { Router } from "express";
import { getAssists } from "../controllers/assists.controller";

const router = Router();

router.get('/', getAssists);

export default router;
