import { DataTypes, Model } from 'sequelize';
import { db } from '../../../models/database/dbConnection';

interface IStudentAttributes {
  id?: number;
  user_id: number;
}

interface IStudentInstance extends Model<IStudentAttributes>, IStudentAttributes {}

const Student = db.define<IStudentInstance>('Student', {
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
  tableName: 'students',
  timestamps: false
});

export default Student;
