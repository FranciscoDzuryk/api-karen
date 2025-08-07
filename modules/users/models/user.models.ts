import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { IUser } from "../interfaces/IUser";
export interface IUserCreationAttributes extends Optional<IUser, "id"> {}

const User = db.define<Model<IUser, IUserCreationAttributes>>('User', {
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
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;