/**
 * @type 0: created
 * @type 1: disabled
 * @type 2: enabled
 */
type UserStatusId = 0 | 1 | 2;

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  user_status_id: UserStatusId; 
  code_register?: string;
  code_recovery?: string;
  created_at?: Date;
  updated_at?: Date;
}