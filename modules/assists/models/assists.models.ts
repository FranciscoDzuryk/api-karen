import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { IAssists } from "../interfaces/IAssists.interfaces";

export interface IAssistsCreationAttributes extends Optional<IAssists, "id"> {}

const Assists = db.define<Model<IAssists, IAssistsCreationAttributes>>('assists', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Agrega tus campos aquí
}, {
  tableName: 'assists',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Assists;
