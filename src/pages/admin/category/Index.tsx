import { AdminLayout } from '@/layouts/AdminLayout.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight, Loader2, Plus, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { MoreHorizontalIcon } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from '@/service/category.ts';

export default function AdminCategoriesPage() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, isError, error } = CategoryService.useAdminList();
  const { mutate: deleteCategory, isPending: isDeleting } = CategoryService.useAdminDelete();

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
      <div className="flex h-full w-full flex-col justify-between gap-4">
        <div className="flex h-fit w-full flex-col gap-6 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-md font-semibold">Daftar Kategori Obat </h1>
              <p className="text-muted-foreground text-sm">
                Kelola daftar kategori obat yang digunakan dalam toko.
              </p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <div className="relative w-full max-w-md">
                <Search
                  size={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input type="text" placeholder="Cari Kategori..." className="w-full pl-9" />
              </div>
              <Button
                onClick={() => navigate('/admin/categories/create')}
                variant="default"
                className="flex items-center gap-2"
              >
                <Plus size={20} />
                Tambah Kategori Baru
              </Button>
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead className="hidden max-w-[450px] md:table-cell">Deskripsi</TableHead>
                  <TableHead className="text-center">Total Produk</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell className="hidden max-w-[450px] overflow-hidden text-ellipsis whitespace-nowrap md:table-cell">
                      {cat.description}
                    </TableCell>
                    <TableCell className="text-center">{cat.product_count}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/categories/edit/${cat.id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/categories/show/${cat.id}`)}
                          >
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() => deleteCategory(cat.id)}
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total Kategori</TableCell>
                  <TableCell className="text-right">{categories.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Menampilkan {categories.length} dari {categories.length} kategori
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <ChevronLeft />
            </Button>
            <span className="text-sm">1/{categories.length}</span>
            <Button variant="outline">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
