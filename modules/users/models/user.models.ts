import { DataTypes, Model, Optional } from "sequelize";
import { db }  from "@models/database/dbConnection";
import UserStatus from "@modules/users/models/userStatus.models";
import { IUser } from "@modules/users/interfaces/IUser";


export interface IUserCreationAttributes extends Optional<IUser, "id"> {}

const User = db.define<Model<IUser, IUserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code_register: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code_recovery: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_status",
        key: "id"
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default User;