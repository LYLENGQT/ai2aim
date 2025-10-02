import { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
  const [isVisible, setIsVisible] = useState(true);

  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex flex-col items-end gap-3">
        {/* Chat bubble with message */}
        <div 
          className="group relative animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <div className="rounded-2xl bg-primary px-4 py-3 text-white shadow-lg">
            <p className="text-sm font-medium">Need help? Ask AimBot! 🤖</p>
            <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-primary"></div>
          </div>
        </div>

        {/* Chat button */}
        <div className="flex items-center gap-2">
          <Button
            onClick={openChat}
            className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 hover:bg-muted"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
