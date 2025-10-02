import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export default function ChatButton({ 
  children, 
  variant = "default", 
  size = "default",
  className 
}: ChatButtonProps) {
  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return (
    <Button
      onClick={openChat}
      variant={variant}
      size={size}
      className={className}
    >
      {children || (
        <>
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with AimBot
        </>
      )}
    </Button>
  );
}
