import { DataTypes, Model, Optional  } from 'sequelize';
import { db } from '@models/database/dbConnection';
import { ITeacher } from '@modules/teacher/interfaces/ITeacher';
import { IUser } from "@modules/users/interfaces/IUser";


export interface ITeacherCreationAttributes extends Optional<ITeacher, 'id'> {}

interface ITeacherInstance extends Model<ITeacher, ITeacherCreationAttributes>, ITeacher {}

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
});

export default Teacher;
