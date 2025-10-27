import { DataTypes, Model } from "sequelize";
import { db } from "@models/database/dbConnection";

const TeacherStudent = db.define('teacher_student', {
 id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
 },
 teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'teachers',
        key: 'id'
    }
 },
 student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'students',
        key: 'id'
    }
 },
 status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
 }   
}, {
    tableName: 'teacher_students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default TeacherStudent;