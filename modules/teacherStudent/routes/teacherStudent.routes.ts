import { Router } from "express";
import { TeacherStudentController } from "../controllers/teacherStudent.controller";
import { authenticateToken } from "@middleware/auth";

const router = Router();

router.get('/students', authenticateToken, TeacherStudentController.listStudents);
router.post('/students', authenticateToken, TeacherStudentController.addStudent);
router.delete('/students/:studentId', authenticateToken, TeacherStudentController.removeStudent);
router.post('/students/:studentId/status', authenticateToken, TeacherStudentController.updateStudentStatus);

export default router;