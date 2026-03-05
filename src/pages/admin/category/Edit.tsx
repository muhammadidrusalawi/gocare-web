import { AdminLayout } from '@/layouts/AdminLayout.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryService } from '@/service/category.ts';
import { useForm } from 'react-hook-form';
import { type UpdateCategoryForm, updateCategorySchema } from '@/schema/category-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function AdminUpdateCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading, isError, error } = CategoryService.useAdminGetById(id);
  const updateMutation = CategoryService.useAdminUpdate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCategoryForm>({
    resolver: zodResolver(updateCategorySchema),
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category?.description ?? '',
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: UpdateCategoryForm) => {
    try {
      const res = await updateMutation.mutateAsync({
        id: id!,
        payload: data,
      });

      if (res.success && res.data) {
        toast.success(res.message);
        navigate('/admin/categories');
      }
    } catch {
      reset();
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isError)
    return (
      <AdminLayout>
        <div className="flex h-full w-full items-center justify-center">
          <p>Error: {(error as Error).message}</p>
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex h-fit w-full flex-col gap-6 rounded-xl border bg-white p-4">
        <div className="flex items-center justify-start">
          <div>
            <h1 className="text-md font-semibold">Edit Kategori</h1>
            <p className="text-muted-foreground text-sm">
              Lengkapi informasi untuk menambahkannya ke dalam sistem.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Nama Kategori</Label>
            <div className="relative mt-2 flex flex-col gap-1">
              <Input type="text" {...register('name')} placeholder="Obat umum" />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="name">Deskripsi</Label>
            <div className="relative mt-2 flex flex-col gap-1">
              <Textarea {...register('description')} placeholder="Masukin deskripsi" />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-end gap-2">
            <Button
              type="button"
              onClick={() => navigate('/admin/categories')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Kembali ke Daftar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
