import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";
import useChat from "../hooks/useChat";

export default function FloatingChat() {
  const [isVisible, setIsVisible] = useState(false);
  const { openChat } = useChat();

  useEffect(() => {
    // Show floating chat after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChatClick = () => {
    openChat();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40 floating-chat-custom">
        <div className="relative">
          
          {/* Chat Button */}
          <Button
            onClick={handleChatClick}
            className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>

          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AimBot is online
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
        </div>
      </div>

    </>
  );
}
