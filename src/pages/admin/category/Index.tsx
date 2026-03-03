import { AdminLayout } from '@/layouts/AdminLayout.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
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

const categories = [
  {
    id: '1a2b3c4d-0001-0000-0000-000000000001',
    name: 'Obat Penyakit Umum',
    description:
      'Obat-obatan yang digunakan untuk mengobati penyakit umum seperti demam, flu, dan sakit kepala.',
    product_count: 24,
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000002',
    name: 'Vitamin & Suplemen',
    description: 'Vitamin dan suplemen untuk menjaga kesehatan tubuh dan meningkatkan imun.',
    product_count: 40,
  },
  {
    id: '1a2b3c4d-0003-0000-0000-000000000003',
    name: 'Alat Kesehatan',
    description: 'Alat-alat kesehatan seperti termometer, tensimeter, dan masker medis.',
    product_count: 15,
  },
  {
    id: '1a2b3c4d-0004-0000-0000-000000000004',
    name: 'Obat Khusus Anak',
    description: 'Obat-obatan khusus untuk anak-anak, termasuk sirup dan vitamin anak.',
    product_count: 12,
  },
  {
    id: '1a2b3c4d-0005-0000-0000-000000000005',
    name: 'Obat Jantung & Darah',
    description: 'Obat-obatan untuk kesehatan jantung dan pengaturan tekanan darah.',
    product_count: 18,
  },
  {
    id: '1a2b3c4d-0006-0000-0000-000000000006',
    name: 'Obat Diabetes',
    description: 'Obat-obatan untuk mengontrol gula darah dan pengelolaan diabetes.',
    product_count: 10,
  },
  {
    id: '1a2b3c4d-0007-0000-0000-000000000007',
    name: 'Obat Kulit',
    description: 'Obat-obatan untuk perawatan kulit, termasuk eksim, jerawat, dan alergi kulit.',
    product_count: 22,
  },
  {
    id: '1a2b3c4d-0008-0000-0000-000000000008',
    name: 'Obat Mata & Telinga',
    description: 'Obat tetes mata, salep telinga, dan obat untuk infeksi ringan.',
    product_count: 9,
  },
  {
    id: '1a2b3c4d-0009-0000-0000-000000000009',
    name: 'Obat Nyeri & Anti Inflamasi',
    description: 'Obat penghilang nyeri dan anti inflamasi untuk kondisi ringan hingga sedang.',
    product_count: 30,
  },
  {
    id: '1a2b3c4d-0010-0000-0000-000000000010',
    name: 'Obat Pencernaan',
    description: 'Obat-obatan untuk gangguan pencernaan seperti maag, diare, dan sembelit.',
    product_count: 16,
  },
];

export default function AdminCategoriesPage() {
  const navigate = useNavigate();

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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
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
