import { type ReactNode, useState, useEffect } from 'react';
import { SidebarContext } from '@/context/sidebar-context.ts';

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebarVisible');
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarVisible', String(isSidebarVisible));
  }, [isSidebarVisible]);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, setIsSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
}
