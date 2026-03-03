import { useContext } from 'react';
import { AuthContextType } from '@/context/auth-context.ts';

export function useAuth() {
  const context = useContext(AuthContextType);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
