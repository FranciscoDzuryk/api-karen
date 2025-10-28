import { Router, RequestHandler } from "express";
import { TeacherStudentController } from "../controllers/teacherStudent.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.get('/students', authenticateToken as any, TeacherStudentController.listStudents as RequestHandler);
router.post('/students', authenticateToken as any, TeacherStudentController.addStudent as RequestHandler);
router.delete('/students/:studentId', authenticateToken as any, TeacherStudentController.removeStudent as RequestHandler);
router.post('/students/:studentId/status', authenticateToken as any, TeacherStudentController.updateStudentStatus as RequestHandler);

export default router;