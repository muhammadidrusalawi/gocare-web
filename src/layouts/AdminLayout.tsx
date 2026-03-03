import { Sidebar } from '@/components/ui/sidebar.tsx';
import { useSidebar } from '@/hooks/use-sidebar.ts';
import { Header } from '@/components/ui/header.tsx';
import { SidebarProvider } from '@/providers/sidebar-provider.tsx';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarVisible } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div
        className={`flex flex-1 flex-col transition-all duration-500 ${
          isSidebarVisible ? 'md:ml-64' : 'ml-0'
        } overflow-y-auto`}
      >
        <Header />
        <main className="flex-1 px-4 pb-4">{children}</main>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
