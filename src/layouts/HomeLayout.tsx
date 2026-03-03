import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { Userprofile } from '@/components/ui/userprofile.tsx';
import { ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';

export function HomeLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full border-b bg-white">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
          <h2 className="text-2xl font-bold">GoCare</h2>

          <div>
            <Input placeholder="Cari obat, vitamin, atau alat kesehatan..." className="w-96" />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/auth/sign-in')} variant="ghost">
              <ShoppingCart />
            </Button>
            <Userprofile />
          </div>
        </nav>
      </header>
      <main className="mx-auto mt-22 flex w-full max-w-6xl flex-1 flex-col gap-8 bg-white px-4">
        {children}
      </main>
    </div>
  );
}
