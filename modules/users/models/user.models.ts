import { DataTypes, Model } from "sequelize";
import { db } from "../../../models/database/dbConnection";

interface IUserAttributes {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  code_register?: string | null;
  code_recovery?: string | null;
  active: number;
  user_status_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface IUserInstance extends Model<IUserAttributes>, IUserAttributes {}

const User = db.define<IUserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  code_register: {
    type: DataTypes.STRING,
    allowNull: true
  },
  code_recovery: {
    type: DataTypes.STRING,
    allowNull: true
  },
  active: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_status_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;
