import { AdminLayout } from '@/layouts/AdminLayout.tsx';
import { ChevronLeft, ChevronRight, Filter, MoreHorizontalIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
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

const products = [
  {
    id: 'p-001',
    name: 'Paracetamol 500mg',
    description: 'Obat untuk meredakan demam dan nyeri ringan.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 5000,
    stock: 50,
    category: {
      id: 'c-001',
      name: 'Obat Penyakit Umum',
    },
  },
  {
    id: 'p-002',
    name: 'Vitamin C 1000mg',
    description: 'Suplemen vitamin C untuk meningkatkan daya tahan tubuh.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 15000,
    stock: 30,
    category: {
      id: 'c-002',
      name: 'Vitamin & Suplemen',
    },
  },
  {
    id: 'p-003',
    name: 'Masker Medis 3-ply',
    description: 'Masker sekali pakai untuk perlindungan harian.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 2000,
    stock: 100,
    category: {
      id: 'c-003',
      name: 'Alat Kesehatan',
    },
  },
  {
    id: 'p-004',
    name: 'Sirup Batuk Anak',
    description: 'Obat batuk khusus anak-anak, rasa buah.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 12000,
    stock: 25,
    category: {
      id: 'c-004',
      name: 'Obat Khusus Anak',
    },
  },
  {
    id: 'p-005',
    name: 'Obat Tekanan Darah',
    description: 'Obat untuk mengontrol tekanan darah tinggi.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 25000,
    stock: 20,
    category: {
      id: 'c-005',
      name: 'Obat Jantung & Darah',
    },
  },
  {
    id: 'p-006',
    name: 'Metformin 500mg',
    description: 'Obat untuk mengontrol kadar gula darah pada diabetes.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 10000,
    stock: 15,
    category: {
      id: 'c-006',
      name: 'Obat Diabetes',
    },
  },
  {
    id: 'p-007',
    name: 'Salep Jerawat',
    description: 'Salep untuk mengurangi jerawat dan peradangan kulit.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 8000,
    stock: 40,
    category: {
      id: 'c-007',
      name: 'Obat Kulit',
    },
  },
  {
    id: 'p-008',
    name: 'Tetes Mata Anti Iritasi',
    description: 'Tetes mata untuk mengurangi kemerahan dan iritasi ringan.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 9000,
    stock: 35,
    category: {
      id: 'c-008',
      name: 'Obat Mata & Telinga',
    },
  },
  {
    id: 'p-009',
    name: 'Ibuprofen 400mg',
    description: 'Obat anti-inflamasi untuk nyeri ringan hingga sedang.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 7000,
    stock: 45,
    category: {
      id: 'c-009',
      name: 'Obat Nyeri & Anti Inflamasi',
    },
  },
  {
    id: 'p-010',
    name: 'Antasida Tablet',
    description: 'Obat untuk meredakan gangguan pencernaan dan maag.',
    thumbnail: 'https://ui.shadcn.com/placeholder.svg',
    price: 6000,
    stock: 60,
    category: {
      id: 'c-010',
      name: 'Obat Pencernaan',
    },
  },
];

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <div className="flex h-full w-full flex-col justify-between gap-4">
        <div className="flex h-fit w-full flex-col gap-6 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-md font-semibold">Daftar Produk</h1>
              <p className="text-muted-foreground text-sm">
                Kelola daftar produk obat yang digunakan dalam toko.
              </p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button variant="outline">
                <Filter />
              </Button>
              <div className="relative w-full max-w-md">
                <Search
                  size={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <Input type="text" placeholder="Cari Obat..." className="w-full pl-9" />
              </div>
            </div>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Nama Obat</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      })
                        .format(product.price)
                        .replace('Rp ', 'Rp')}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
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
                  <TableCell colSpan={5}>Total Produk</TableCell>
                  <TableCell className="text-right">{products.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Menampilkan {products.length} dari {products.length} produk
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <ChevronLeft />
            </Button>
            <span className="text-sm">1/{products.length}</span>
            <Button variant="outline">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
