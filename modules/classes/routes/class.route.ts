import { Router } from "express";
import { 
    getClasses, 
    getClassById, 
    createClass, 
    updateClass, 
    deleteClass 
} from "../controllers/class.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.get('/', authenticateToken, getClasses);

router.get('/:id', authenticateToken, getClassById);

router.post('/', authenticateToken, createClass);

router.put('/:id', authenticateToken, updateClass);

router.delete('/:id', authenticateToken, deleteClass);

export default router;
