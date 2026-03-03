import { useState } from 'react';
import { Bell, Clock, CheckCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Data dummy notifikasi
const initialNotifications = [
  {
    id: 1,
    user: { name: 'John Doe', initials: 'JD' },
    action: 'mengomentari postingan Anda',
    target: 'Pembaruan Produk',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 menit lalu
    read: false,
  },
  {
    id: 2,
    user: { name: 'Jane Smith', initials: 'JS' },
    action: 'mengirim Anda pesan',
    target: 'Halo, apa kabar?',
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 menit lalu
    read: false,
  },
  {
    id: 3,
    user: { name: 'Acme Inc', initials: 'AI' },
    action: 'menambahkan tugas baru',
    target: 'Review dokumen',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
    read: true,
  },
  {
    id: 4,
    user: { name: 'Bob Johnson', initials: 'BJ' },
    action: 'menyebut Anda dalam komentar',
    target: 'Ide bagus!',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 hari lalu
    read: true,
  },
];

// Helper: format waktu relatif
function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' tahun lalu';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' bulan lalu';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' hari lalu';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' jam lalu';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' menit lalu';
  return 'baru saja';
}

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-sm font-semibold">Notifikasi</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
            >
              <CheckCheck className="h-3 w-3" />
              Tandai semua dibaca
            </button>
          )}
        </div>

        {/* Garis pemisah */}
        <hr className="border-border border-t" />

        {/* Daftar notifikasi dengan scroll manual */}
        <div className="max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center p-4 text-center">
              <Bell className="mb-2 h-8 w-8 opacity-50" />
              <p className="text-sm">Tidak ada notifikasi</p>
            </div>
          ) : (
            <div className="divide-border divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex cursor-pointer items-center gap-3 p-4 transition-colors ${
                    notification.read ? 'hover:bg-muted/50' : 'bg-muted/30 hover:bg-muted/50'
                  } `}
                >
                  {/* Avatar inisial */}
                  <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    {notification.user.initials}
                  </div>

                  {/* Konten notifikasi */}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{notification.user.name}</span>{' '}
                      {notification.action}{' '}
                      <span className="text-primary font-medium">"{notification.target}"</span>
                    </p>

                    {/* Waktu dan indikator baca */}
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{timeAgo(notification.time)}</span>
                      {!notification.read && (
                        <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Garis pemisah */}
        <hr className="border-border border-t" />

        {/* Footer */}
        <div className="p-2">
          <button
            className="hover:bg-muted w-full rounded-md py-2 text-sm"
            onClick={() => {
              // Arahkan ke halaman semua notifikasi (bisa diisi sesuai kebutuhan)
            }}
          >
            Lihat semua notifikasi
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
