import { DataTypes, Model, Optional } from "sequelize";
import { db } from "@models/database/dbConnection";
import { IStudentsubject } from "@modules/studentsubject/interfaces/IStudentsubject";

export interface IStudentsubjectCreationAttributes
  extends Optional<IStudentsubject, never> {} // No hay atributos opcionales

const Studentsubject = db.define<Model<IStudentsubject, IStudentsubjectCreationAttributes>>(
  'Studentsubject',
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'students_subjects',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['student_id', 'subject_id']
      }
    ]
  }
);

export default Studentsubject;
