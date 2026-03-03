import { createContext } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  setIsSidebarVisible: (visible: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
