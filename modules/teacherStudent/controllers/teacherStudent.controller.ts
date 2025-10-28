// Crea un nuevo archivo: teacherStudent.controller.ts en la carpeta controllers
import { Request, Response } from 'express';
import Teacher from '../../teacher/models/teacher.model';
import Student from '@modules/student/models/student.models';
import TeacherStudent from '../models/teacherStudent.model';
import UserStatus from '@modules/users/models/userStatus.models';
import User from '@modules/users/models/user.models';
import Studentsubject from '@modules/studentsubject/models/studentsubject.models';
import Subject from '@modules/subject/models/subject.models';

export class TeacherStudentController {
  static async addStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.body;
      const teacherId = (req as any).user.id;

      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ ok: false, message: 'Estudiante no encontrado' });
      }

      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) {
        return res.status(404).json({ ok: false, message: 'Profesor no encontrado' });
      }

      const existingRelation = await TeacherStudent.findOne({
        where: { teacher_id: teacherId, student_id: studentId }
      });

      if (existingRelation) {
        return res.status(400).json({ 
          ok: false, 
          message: 'El estudiante ya está asignado a este profesor' 
        });
      }

      await TeacherStudent.create({
        teacher_id: teacherId,
        student_id: studentId,
        status: 'active'
      });

      res.status(200).json({ 
        ok: true, 
        message: 'Estudiante agregado correctamente' 
      });
    } catch (error: any) {
      res.status(500).json({ 
        ok: false, 
        message: 'Error al agregar estudiante',
        error: error.message 
      });
    }
  }

  static async removeStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const teacherId = (req as any).user.id;
      const [updated] = await TeacherStudent.update(
        { status: 'inactive' },
        { 
          where: { 
            teacher_id: teacherId, 
            student_id: studentId,
            status: 'active'
          } 
        }
      );

      if (!updated) {
        return res.status(404).json({ 
          ok: false, 
          message: 'No se encontró la relación activa entre el profesor y el estudiante' 
        });
      }

      res.status(200).json({ 
        ok: true, 
        message: 'Estudiante dado de baja correctamente' 
      });
    } catch (error: any) {
      res.status(500).json({ 
        ok: false, 
        message: 'Error al dar de baja al estudiante',
        error: error.message 
      });
    }
  }

  static async listStudents(req: Request, res: Response) {
    try {
      const teacherId = (req as any).user.id;

      const students = await Teacher.findAll({
        where: { id: teacherId },
        include: [{
          model: Student,
          as: 'students',
          where: { status: 'active' },
          through: { attributes: [] }, 
          include: ['user']  
        }]
      });

      res.status(200).json({ 
        ok: true, 
        data: students[0]?.students || [] 
      });
    } catch (error: any) {
      res.status(500).json({ 
        ok: false, 
        message: 'Error al obtener estudiantes',
        error: error.message 
      });
    }
  }

  static async updateStudentStatus(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const { status } = req.body;
      const teacherId = (req as any).user.id;

      console.log(`[DEBUG] Actualizando estado del estudiante ${studentId} por el profesor ${teacherId} a estado: ${status}`);

      const validStatus = await UserStatus.findOne({ where: { name: status } });
      if (!validStatus) {
        const statuses = await UserStatus.findAll();
        const availableStatuses = statuses.map((s: any) => s.get('name'));
        
        return res.status(400).json({
          ok: false,
          message: 'Estado no válido',
          availableStatuses
        });
      }

      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) {
        console.log(`[DEBUG] Profesor con ID ${teacherId} no encontrado`);
        return res.status(404).json({ 
          ok: false, 
          message: 'Profesor no encontrado' 
        });
      }

      const student = await Student.findByPk(studentId, {
        include: [{
          model: User,
          as: 'user',
          required: true
        }]
      });

      if (!student) {
        console.log(`[DEBUG] Estudiante con ID ${studentId} no encontrado`);
        return res.status(404).json({ 
          ok: false, 
          message: 'Estudiante no encontrado' 
        });
      }

      const relation = await TeacherStudent.findOne({
        where: {
          teacher_id: teacherId,
          student_id: studentId,
          status: 'active'
        }
      });

      if (!relation) {
        console.log(`[DEBUG] No se encontró relación activa entre profesor ${teacherId} y estudiante ${studentId}`);
        const inactiveRelation = await TeacherStudent.findOne({
          where: {
            teacher_id: teacherId,
            student_id: studentId,
            status: 'inactive'
          }
        });

        if (inactiveRelation) {
          console.log(`[DEBUG] Se encontró una relación inactiva, activándola...`);
          await inactiveRelation.update({ status: 'active' });
        } else {
          console.log(`[DEBUG] Creando nueva relación entre profesor ${teacherId} y estudiante ${studentId}`);
          await TeacherStudent.create({
            teacher_id: teacherId,
            student_id: studentId,
            status: 'active'
          });
        }
      }

      const subject = await Subject.findOne({ where: { teacher_id: teacherId } });

      Studentsubject.update(
        { status: 2 },
        { where: { student_id: studentId, subject_id: subject?.getDataValue('id') as number } }
      );

      const userId = (student as any).user_id;
      await User.update(
        { user_status_id: validStatus.get('id') as number },
        { where: { id: userId } }
      );

      const updatedUser = await User.findByPk(userId, {
        include: [{
          model: UserStatus,
          as: 'status',
          required: false
        }]
      });
      
      if (!updatedUser) {
        throw new Error('No se pudo obtener la información actualizada del estudiante');
      }

      console.log(`[DEBUG] Estado del estudiante ${studentId} actualizado a '${status}' correctamente`);
      res.status(200).json({
        ok: true,
        message: `Estado del estudiante actualizado a '${status}' correctamente`,
        student: {
          id: student.get('id'),
          name: (updatedUser as any).name,
          email: (updatedUser as any).email,
          status: status,
          statusId: validStatus.get('id')
        }
      });

    } catch (error: any) {
      console.error('[ERROR] Error al actualizar estado del estudiante:', error);
      res.status(500).json({ 
        ok: false, 
        message: 'Error al actualizar el estado del estudiante',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}