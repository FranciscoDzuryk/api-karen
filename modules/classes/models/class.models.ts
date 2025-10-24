import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@models/database/dbConnection";
import { IClass } from "@modules/classes/interfaces/IClass";

export interface IClasseCreationAttributes extends Optional<IClass, "id"> {}

const Classes = db.define<Model<IClass, IClasseCreationAttributes>>('classe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subject_id: {
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.DATE
  },
  class_status_id: {
    type: DataTypes.INTEGER
  },
  // Agrega tus campos aquí
}, {
  tableName: 'classes',
  timestamps: false
});

export default Classes;
