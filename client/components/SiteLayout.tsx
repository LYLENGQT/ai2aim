import { PropsWithChildren, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SidebarChat from "./SidebarChat";
import ChatModal from "./ChatModal";
import useChatManager from "../hooks/useChatManager";
import { SidebarProvider } from "../contexts/SidebarContext";

export default function SiteLayout({ children }: PropsWithChildren) {
  const { showModal, closeModal } = useChatManager();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <SidebarProvider openSidebar={openSidebar} closeSidebar={closeSidebar}>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-background">
        <SiteHeader onOpenChat={openSidebar} />
        <main>{children}</main>
        <SiteFooter />
        <SidebarChat isOpen={isSidebarOpen} onClose={closeSidebar} />
        <ChatModal isOpen={showModal} onClose={closeModal} />
      </div>
    </SidebarProvider>
  );
}
