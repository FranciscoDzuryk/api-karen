export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  user_status_id: number;
  code_register?: string;
  code_recovery?: string;
  created_at?: Date;
  updated_at?: Date;
}