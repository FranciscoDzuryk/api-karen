import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@models/database/dbConnection";
import { IClassContent } from "@modules/classes/interfaces/IClassContent";

export interface IClasseCreationAttributes extends Optional<IClassContent, "id"> {}

const ClassesContent = db.define<Model<IClassContent, IClasseCreationAttributes>>('ClassesContent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'class_content',
  timestamps: false
});

export default ClassesContent;
