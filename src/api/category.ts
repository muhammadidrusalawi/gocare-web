import axiosInstance from '@/utils/axios-instance.ts';
import type { ApiResponse } from '@/types/api.ts';
import type { CategoriesResponse, Category } from '@/types/category.ts';
import {
  type CreateCategoryForm,
  createCategorySchema,
  type UpdateCategoryForm,
  updateCategorySchema,
} from '@/schema/category-schema.ts';

export const adminGetAllCategoriesApi = async (): Promise<ApiResponse<CategoriesResponse>> => {
  const res = await axiosInstance.get<ApiResponse<CategoriesResponse>>('/admin/categories');
  return res.data;
};

export const adminGetCategoryByIdApi = async (id: string): Promise<ApiResponse<Category>> => {
  const res = await axiosInstance.get<ApiResponse<Category>>(`/admin/categories/${id}`);
  return res.data;
};

export const adminCreateCategoryApi = async (
  payload: CreateCategoryForm
): Promise<ApiResponse<Category>> => {
  const parsed = createCategorySchema.parse(payload);
  const res = await axiosInstance.post<ApiResponse<Category>>('/admin/categories', parsed);
  return res.data;
};

export const adminUpdateCategoryApi = async (
  id: string,
  payload: UpdateCategoryForm
): Promise<ApiResponse<Category>> => {
  const parsed = updateCategorySchema.parse(payload);
  const res = await axiosInstance.put<ApiResponse<Category>>(`/admin/categories/${id}`, parsed);
  return res.data;
};

export const adminDeleteCategoryApi = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axiosInstance.delete<ApiResponse<null>>(`/admin/categories/${id}`);
  return res.data;
};
