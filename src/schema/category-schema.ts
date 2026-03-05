import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(3, { message: 'Nama Kategori wajib diisi' }),
  description: z
    .string()
    .transform((val) => val.trim())
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .transform((val) => val.trim())
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || val.length >= 3, {
      message: 'Nama Kategori minimal 3 karakter',
    })
    .optional(),

  description: z
    .string()
    .transform((val) => val.trim())
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;
