import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";

interface SidebarChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarChat({ isOpen, onClose }: SidebarChatProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar Chat Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border/60 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out sidebar-chat translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Support</h3>
                <p className="text-xs text-foreground/60">Get assistance</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chatbase Widget */}
          <div className="flex-1 p-0">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/8vqH1oKJkpgmJdmHhrQrT"
              width="100%"
              style={{ height: '100%', minHeight: '700px' }}
              frameBorder="0"
              className="rounded-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
