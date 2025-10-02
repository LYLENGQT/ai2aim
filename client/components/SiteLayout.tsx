import { PropsWithChildren } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingActionButton from "./FloatingActionButton";
import FloatingChat from "./FloatingChat";
import ChatModal from "./ChatModal";
import useChat from "../hooks/useChat";

export default function SiteLayout({ children }: PropsWithChildren) {
  const { isModalOpen, handleModalClose, handleModalChat } = useChat();

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActionButton />
      <FloatingChat />
      <ChatModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
      />
    </div>
  );
}
