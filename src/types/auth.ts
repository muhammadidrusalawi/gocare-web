import type { User } from '@/types/user.ts';

export interface LoginResponse {
  user: User;
  token: string;
}
