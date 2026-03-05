import { AdminLayout } from '@/layouts/AdminLayout.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryService } from '@/service/category.ts';
import { Loader2 } from 'lucide-react';

export default function AdminShowCategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading, isError, error } = CategoryService.useAdminGetById(id);

  if (isLoading)
    return (
      <AdminLayout>
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </AdminLayout>
    );

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
      <div>
        <h1 className="text-xl font-bold">{category?.name}</h1>
        <p className="mt-2 text-gray-600">{category?.description ?? '-'}</p>
        <p className="mt-2 text-gray-600">{category?.product_count ?? '-'}</p>
        <p className="mt-2 text-gray-600">{category?.created_at ?? '-'}</p>
        <p className="mt-2 text-gray-600">{category?.updated_at ?? '-'}</p>

        <button onClick={() => navigate('/admin/categories')} className="mt-4 underline">
          Back
        </button>
      </div>
    </AdminLayout>
  );
}
