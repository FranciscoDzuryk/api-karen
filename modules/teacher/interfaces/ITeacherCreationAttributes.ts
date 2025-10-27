import { Optional } from 'sequelize';
import { ITeacher } from './ITeacher';

export interface ITeacherCreationAttributes extends Optional<ITeacher, 'id' | 'students'> {}
