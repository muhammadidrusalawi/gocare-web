import type { User } from '@/types/user.ts';
import { createContext } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (payload: Partial<User>) => void;
  isAuthenticated: boolean;
  initialized: boolean;
}

export const AuthContextType = createContext<AuthContextType | undefined>(undefined);
