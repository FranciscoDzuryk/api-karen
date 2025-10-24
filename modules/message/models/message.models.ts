import { DataTypes, Model } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { IMessage } from "../interfaces/IMessage.interfaces";

const Message = db.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'messages',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true
});

Message.sync({ force: true })
  .then(() => {
    console.log('Tabla de mensajes sincronizada correctamente');
    console.log('Estructura de la tabla:');
    return db.query("SHOW CREATE TABLE messages", { type: 'SELECT' });
  })
  .then(([result]: any) => {
    console.log('Estructura actual de la tabla:', result['Create Table']);
  })
  .catch(error => {
    console.error('Error al sincronizar la tabla de mensajes:', error);
    return Message.sync({ alter: true })
      .then(() => console.log('Tabla de mensajes actualizada con alter'))
      .catch(err => console.error('Error al actualizar la tabla con alter:', err));
  });

export interface IMessageInstance extends Model<IMessage>, IMessage {}

export default Message;
