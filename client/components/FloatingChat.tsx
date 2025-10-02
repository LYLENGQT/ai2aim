import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show floating chat after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChatClick = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    if (window.chatbase) {
      window.chatbase("close");
    }
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40 floating-chat-custom">
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          
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
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AimBot is online
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </div>

      {/* Chat Widget Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 pointer-events-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">AimBot</h3>
                  <p className="text-xs text-gray-600">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-600 mb-4">Click to start chatting with AimBot!</p>
                <Button 
                  onClick={() => {
                    if (window.chatbase) {
                      window.chatbase("open");
                    }
                  }}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Open Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
