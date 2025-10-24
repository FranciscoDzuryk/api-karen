import { Router } from "express";
import { getStudentsubjects } from "../controllers/studentsubject.controller";

const router = Router();

router.get('/', getStudentsubjects);

export default router;
