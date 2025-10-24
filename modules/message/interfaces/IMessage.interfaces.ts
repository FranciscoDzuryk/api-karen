export interface IMessage {
  id: string;
  sender_id: number;
  receiver_id: number;
  content: string;
  // is_read?: boolean;
  created_at?: Date;
  // updated_at?: Date;

  // comentados porque pueden agregarse en la db
}
