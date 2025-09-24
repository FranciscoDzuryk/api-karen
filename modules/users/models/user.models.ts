import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import UserStatus from "./userStatus.models";
import { IUser } from "../interfaces/IUser";


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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_status",
        key: "id"
      }
    }
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

// Relación con UserStatus
User.belongsTo(UserStatus, { foreignKey: "user_status_id", as: "status" });

export default User;
