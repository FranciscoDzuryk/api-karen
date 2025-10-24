export interface IUser {
  id: number;
  name: string;
  // lastname: string; no está en la db pero seguramente lo tengan que agregar
  email: string;
  password: string;
  user_status_id: number;
  created_at?: Date;
  
}