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
      // Small delay to ensure smooth animation
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Open Chatbase widget when modal opens
      setTimeout(() => {
        if (window.chatbase) {
          window.chatbase("open");
        }
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">AimBot Assistant</h3>
              <p className="text-sm text-gray-600">Your AI guide is here to help!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Welcome to AI2Aim!
              </h4>
              <p className="text-gray-600 mb-4">
                I'm AimBot, your AI assistant. I can help you with:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Answer questions about our AI solutions</li>
                <li>• Help schedule a demo</li>
                <li>• Provide technical support</li>
                <li>• Generate leads and inquiries</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  if (window.chatbase) {
                    window.chatbase("open");
                  }
                  onClose();
                }}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                Start Chatting
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
