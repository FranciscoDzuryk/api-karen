export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  code_register:string;
  code_recovery:string;
  user_status_id: number;
}