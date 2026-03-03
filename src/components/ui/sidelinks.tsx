import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PieChart,
  Users,
  Settings,
  Bell,
  FileText,
  ChevronRight,
  Package,
  Tickets,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible.tsx';

const ADMIN_PREFIX = '/admin';

const groupedItems = [
  {
    groupTitle: 'Overview',
    icon: <PieChart size={18} />,
    items: [
      { title: 'Dashboard', href: 'dashboard' },
      { title: 'Performa Penjualan', href: '#' },
      { title: 'Laporan', href: '#' },
    ],
  },
  {
    groupTitle: 'Produk Manajemen',
    icon: <Package size={18} />,
    items: [
      { title: 'Kategori', href: 'categories' },
      { title: 'Semua Produk', href: 'products' },
      { title: 'Produk Diarsipkan', href: '#' },
    ],
  },
  {
    groupTitle: 'Pesanan',
    icon: <FileText size={18} />,
    items: [
      { title: 'Semua Pesanan', href: '#' },
      { title: 'Pembayaran', href: '#' },
      { title: 'Pembatalan', href: '#' },
    ],
  },
  {
    groupTitle: 'Pelanggan',
    icon: <Users size={18} />,
    items: [
      { title: 'Daftar Pelanggan', href: '#' },
      { title: 'Resep', href: '#' },
    ],
  },
  {
    groupTitle: 'Promosi',
    icon: <Tickets size={18} />,
    items: [
      { title: 'Kode Promo', href: '#' },
      { title: 'Penawaran Khusus', href: '#' },
      { title: 'Kampanye', href: '#' },
    ],
  },
  {
    groupTitle: 'Pengaturan',
    icon: <Settings size={18} />,
    items: [
      { title: 'Pengaturan Umum', href: '#' },
      { title: 'Pengaturan Pembayaran', href: '#' },
      { title: 'Pengaturan Notifikasi', href: '#' },
    ],
  },
  {
    groupTitle: 'Notifikasi',
    icon: <Bell size={18} />,
    items: [
      { title: 'Pusat Notifikasi', href: '#' },
      { title: 'Preferensi', href: '#' },
    ],
  },
];

export function SideLinks() {
  const location = useLocation();

  const defaultOpenGroups = groupedItems
    .filter((g) =>
      g.items.some((i) => {
        const href = `${ADMIN_PREFIX}/${i.href}`;
        return location.pathname === href || location.pathname.startsWith(`${href}/`);
      })
    )
    .map((g) => g.groupTitle);

  const [openGroups, setOpenGroups] = useState<string[]>(defaultOpenGroups);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupTitle) ? prev.filter((g) => g !== groupTitle) : [...prev, groupTitle]
    );
  };

  return (
    <>
      {groupedItems.map((group) => {
        const isOpen = openGroups.includes(group.groupTitle);

        return (
          <Collapsible key={group.groupTitle} open={isOpen}>
            <CollapsibleTrigger
              onClick={() => toggleGroup(group.groupTitle)}
              className="flex w-full items-center justify-between rounded p-2 text-sm hover:bg-gray-200/40"
            >
              <div className="flex items-center gap-3">
                {group.icon}
                {group.groupTitle}
              </div>
              <ChevronRight
                size={18}
                className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="flex">
                <div className="my-1 ml-4 border-l border-gray-300" />
                <div className="flex flex-1 flex-col">
                  {group.items.map((item) => {
                    const href = `${ADMIN_PREFIX}/${item.href}`;
                    const isActive =
                      location.pathname === href || location.pathname.startsWith(`${href}/`);

                    return (
                      <div key={item.title} className="px-2 py-1.5">
                        <Link
                          to={href}
                          className={`block pl-3.5 text-sm ${
                            isActive ? 'font-medium text-blue-500' : 'text-gray-700'
                          } hover:text-blue-500`}
                        >
                          {item.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </>
  );
}
