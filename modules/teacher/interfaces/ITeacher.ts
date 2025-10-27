import { IStudentAttributes } from "@modules/student/interfaces/IStudentAttributes";

export interface ITeacher {
    id?: number;
    user_id: number;
    students?: IStudentAttributes[];
}