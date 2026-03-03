import { useAuth } from '@/hooks/use-auth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi, logoutApi } from '@/api/auth.ts';
import type { LoginForm } from '@/schema/auth-schema.ts';
import toast from 'react-hot-toast';

export const authService = {
  useLogin() {
    const { login } = useAuth();

    return useMutation({
      mutationFn: (payload: LoginForm) => loginApi(payload),

      onSuccess: (res) => {
        login(res.data.user, res.data.token);
        toast.success(res.message);
      },

      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Login Gagal');
      },
    });
  },

  useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => logoutApi(),
      onSuccess: (res) => {
        queryClient.clear();
        logout();
        toast.success(res.message);
      },

      onError: (err: any) => {
        queryClient.clear();
        logout();

        toast.error(err?.response?.data?.message || 'Logout Gagal');
      },
    });
  },
};
