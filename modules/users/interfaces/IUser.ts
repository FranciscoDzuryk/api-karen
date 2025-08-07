export interface IUser {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  code_register: string;
  code_recovery: string;
  active: number;
}