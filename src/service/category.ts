import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { Category } from '@/types/category.ts';
import {
  adminCreateCategoryApi,
  adminDeleteCategoryApi,
  adminGetAllCategoriesApi,
  adminGetCategoryByIdApi,
  adminUpdateCategoryApi,
} from '@/api/category.ts';
import toast from 'react-hot-toast';
import type { CreateCategoryForm, UpdateCategoryForm } from '@/schema/category-schema.ts';

export const CategoryService = {
  useAdminList() {
    const options: UseQueryOptions<Category[], Error> = {
      queryKey: ['categories'],
      queryFn: async () => {
        const res = await adminGetAllCategoriesApi();
        return res.data ?? [];
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    };

    return useQuery(options);
  },

  useAdminCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: CreateCategoryForm) => adminCreateCategoryApi(payload),
      onSuccess: async (res) => {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (err: any) => {
        if (err.name === 'ZodError') {
          toast.error('Invalid category data');
        } else {
          toast.error(err?.response?.data?.message || 'An error occurred');
        }
      },
    });
  },

  useAdminGetById(id?: string) {
    return useQuery({
      queryKey: ['categories', id],
      queryFn: async (): Promise<Category> => {
        const res = await adminGetCategoryByIdApi(id!);
        return res.data;
      },
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });
  },

  useAdminUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: UpdateCategoryForm }) =>
        adminUpdateCategoryApi(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] }).catch(() => {});
      },

      onError: (err: any) => {
        if (err.name === 'ZodError') {
          toast.error('Invalid category data');
        } else {
          toast.error(err?.response?.data?.message || 'An error occurred');
        }
      },
    });
  },

  useAdminDelete() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => adminDeleteCategoryApi(id),
      onSuccess: async (res) => {
        toast.success(res.message);
        await queryClient.invalidateQueries({ queryKey: ['categories'] });
      },

      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'An error occurred');
      },
    });
  },
};
