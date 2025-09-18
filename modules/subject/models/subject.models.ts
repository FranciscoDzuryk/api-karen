import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { ISubject } from "../interfaces/ISubject.interfaces";

export interface ISubjectCreationAttributes extends Optional<ISubject, "id"> {}

const Subject = db.define<Model<ISubject, ISubjectCreationAttributes>>('subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Agrega tus campos aquí
}, {
  tableName: 'subjects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Subject;
