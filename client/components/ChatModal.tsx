import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, MessageCircle } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={`relative mx-4 w-full max-w-md transform rounded-2xl border border-border/60 bg-background p-6 shadow-2xl transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold">Need Help?</h2>
          <p className="mb-6 text-foreground/70">
            Our team is here to answer your questions about our solutions, schedule a consultation, or help you get started.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={openChat}
              className="w-full h-12 text-base font-medium"
            >
              Start Conversation
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
          
          <p className="mt-4 text-xs text-foreground/50">
            Available 24/7 via chat
          </p>
        </div>
      </div>
    </div>
  );
}
