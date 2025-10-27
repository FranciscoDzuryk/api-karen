import { DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import { db } from '@models/database/dbConnection';
import { ITeacher } from '@modules/teacher/interfaces/ITeacher';
import { IUser } from "@modules/users/interfaces/IUser";
import Student from '@modules/student/models/student.models';

export interface ITeacherCreationAttributes extends Optional<ITeacher, 'id'> {}

interface ITeacherInstance extends Model<ITeacher, ITeacherCreationAttributes>, ITeacher {}

interface ITeacherModel extends ModelStatic<ITeacherInstance> {
  associate?: (models: any) => void;
}

const Teacher = db.define<ITeacherInstance>('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'teachers',
  timestamps: false
}) as ITeacherModel;

Teacher.associate = (models: any) => {
  Teacher.belongsToMany(models.Student, {
    through: 'teacher_students',
    foreignKey: 'teacher_id',
    otherKey: 'student_id'
  })
};

export default Teacher;
