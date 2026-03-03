import { useSidebar } from '@/hooks/use-sidebar.ts';
import { Building2, Headset, Info } from 'lucide-react';
import { SideLinks } from '@/components/ui/sidelinks.tsx';
import { Link } from 'react-router-dom';

export function Sidebar() {
  const { isSidebarVisible, setIsSidebarVisible } = useSidebar();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r bg-white px-2 py-6 transition-all duration-500 ease-in-out ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left text-sm leading-tight">
            <span className="truncate font-medium">Acme Inc.</span>
            <span className="truncate text-xs text-gray-500">Enterprise</span>
          </div>
        </div>

        <nav className="mt-4 flex w-full flex-col overflow-y-auto px-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <h1 className="mb-1 text-[13px] font-medium">Platform</h1>
          <SideLinks />
        </nav>

        <div className="mt-auto flex w-full flex-col items-center px-2 pt-4">
          <div className="w-full">
            <Link
              to="#"
              className="flex items-center gap-3 rounded px-2 py-1.5 text-sm text-gray-700 hover:text-blue-500"
            >
              <Headset size={16} />
              Hubungi Tim
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded px-2 py-1.5 text-sm text-gray-700 hover:text-blue-500"
            >
              <Info size={16} />
              Tentang Aplikasi
            </Link>
          </div>
        </div>
      </aside>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsSidebarVisible(false)}
        ></div>
      )}
    </>
  );
}
