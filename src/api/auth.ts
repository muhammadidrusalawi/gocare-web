import axiosInstance from '@/utils/axios-instance.ts';
import type { ApiResponse } from '@/types/api.ts';
import { type LoginForm, loginSchema } from '@/schema/auth-schema.ts';
import type { LoginResponse } from '@/types/auth.ts';

export const loginApi = async (payload: LoginForm): Promise<ApiResponse<LoginResponse>> => {
  const parsed = loginSchema.parse(payload);

  const res = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', parsed);
  return res.data;
};

export const logoutApi = async (): Promise<ApiResponse<void>> => {
  const res = await axiosInstance.post<ApiResponse<void>>('/auth/logout');
  return res.data;
};
