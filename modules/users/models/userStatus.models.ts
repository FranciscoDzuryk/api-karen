import { DataTypes, Model } from "sequelize";
import { db } from "../../../models/database/dbConnection";

const UserStatus = db.define<Model>(
  "UserStatus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "user_status",
    timestamps: false
  }
);

export default UserStatus;
