import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { IMessage } from "../interfaces/IMessage.interfaces";

export interface IMessageCreationAttributes extends Optional<IMessage, "id"> {}

const Message = db.define<Model<IMessage, IMessageCreationAttributes>>('message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Agrega tus campos aquí
}, {
  tableName: 'messages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Message;
