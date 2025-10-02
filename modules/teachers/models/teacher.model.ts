import { DataTypes, Model } from 'sequelize';
import { db } from '../../../models/database/dbConnection';

interface ITeacherAttributes {
  id?: number;
  user_id: number;
}

interface ITeacherInstance extends Model<ITeacherAttributes>, ITeacherAttributes {}

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
