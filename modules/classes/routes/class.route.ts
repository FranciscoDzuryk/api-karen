import { RequestHandler, Router } from "express";
import { 
    getClasses, 
    getClassById, 
    createClass, 
    updateClass, 
    deleteClass 
} from "../controllers/class.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.get('/', authenticateToken as any, getClasses);

router.get('/:id', authenticateToken as any, getClassById as RequestHandler);

router.post('/', authenticateToken as any, createClass);

router.put('/:id', authenticateToken as any, updateClass as RequestHandler);

router.delete('/:id', authenticateToken as any, deleteClass as RequestHandler);

export default router;
