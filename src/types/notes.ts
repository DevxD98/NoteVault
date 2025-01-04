export interface Note {
  id: string;
  user_id: string;
  content: string;
  type: 'quick' | 'study';
  created_at: string;
}