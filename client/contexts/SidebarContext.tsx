import { createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children, openSidebar, closeSidebar }: { children: ReactNode; openSidebar: () => void; closeSidebar: () => void }) {
  return (
    <SidebarContext.Provider value={{ openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
