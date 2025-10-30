import bcrypt from 'bcryptjs';
import User from '@modules/users/models/user.models';
import Student from '@modules/student/models/student.models';
import Subject from '@modules/subject/models/subject.models';
import Studentsubject from '@modules/studentsubject/models/studentsubject.models';
import Teacher from '@modules/teacher/models/teacher.model';
import Classes from '@modules/classes/models/class.models';
import ClassesContent from '@modules/classes/models/classContent.models';
import UserStatus from '@modules/users/models/userStatus.models';
import "@models/usersAssociations"; 
import TeacherStudent from '@modules/teacherStudent/models/teacherStudent.model';

export class UserService {
    static async getAllUsers() {
        const include: any[] = [
            {
            model: UserStatus,
            as: "status",
            attributes: ["name"]
            },
            {
                model: Student,
                as: "student",
                required: true 
            }
        ];

        return await User.findAll({
            attributes: { exclude: ["password"] },
            include
        });
    }


  static async createStudentUser(data: any) {
    const { name, lastname, email, password } = data;

    if (!name || !lastname || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('Correo electrónico ya registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      code_register: Math.floor(100000 + Math.random() * 900000).toString(),
      code_recovery: '',
      user_status_id: 1 
    });

    const teacher = await Teacher.findOne();
    if (!teacher) throw new Error('No hay profesores registrados');
    
    const newStudent = await Student.create({ user_id: newUser.getDataValue('id') });
    const newTeacherStudent = await TeacherStudent.create(
      {
        teacher_id: teacher.getDataValue('id'),
        student_id: newStudent.getDataValue('id'),
        status: 'active'
      }
    );
    
    if (newTeacherStudent.getDataValue('status') !== 'active' ) {
        throw new Error('Error al asignar el estudiante al profesor');
    }
    const firstSubject = await Subject.findOne({ order: [['id', 'ASC']] });
    
    if (!firstSubject) throw new Error('No hay materias');
    
    await Studentsubject.create({
        student_id: newStudent.getDataValue('id') as number,
        subject_id: firstSubject.getDataValue('id') as number,
        status: 1
    });

    return newUser;
  }

   /** Crear usuario profesor */
   static async createTeacherUser(data: { name: string; lastname: string; email: string; password: string }) {
    const { name, lastname, email, password } = data;

    if (!name || !lastname || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('Correo electrónico ya registrado');

    // Para no privar la API, dejamos crear un solo profesor
    // to do: eliminar esta restricción en el futuro si es necesario, y crear un admin para los token en principio.
    const existingProfesor = await Teacher.findAndCountAll();
    if (existingProfesor.count > 0) throw new Error('Ya existe un profesor registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      code_register: '',
      code_recovery: '',
      user_status_id: 2 // Los profesores se crean directamente como 'Habilitados'
    });

    const teacherData = await Teacher.create({ user_id: newUser.getDataValue('id') as number });
    const subjectData = await Subject.create({ name: 'Nueva Materia', teacher_id: teacherData.getDataValue('id') as number });

    const classData = await Classes.create({ 
      date: new Date(),
      subject_id: subjectData.getDataValue('id') as number,
      class_status_id: 2,
    });

    ClassesContent.create(
      {
        'class_id' : classData.getDataValue('id') as number,
        'content' : 'Contenido de la clase 1'
      }
    )
    return newUser;
  }

   static async verifyRegisterCode(email: string, code: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
   
    if (!user.getDataValue('code_register')) {
        throw new Error('El usuario ya ha sido verificado');
    }
   
    if (user.getDataValue('code_register') !== code) {
        throw new Error('Código incorrecto');
    }

    await user.update({ code_register: '', user_status_id: 2 });
    return user;
  }
}
