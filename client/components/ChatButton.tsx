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
  className = ""
}: ChatButtonProps) {
  const handleChatClick = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return (
    <Button
      onClick={handleChatClick}
      variant={variant}
      size={size}
      className={`${className} ${variant === "default" ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" : ""}`}
    >
      {children || (
        <>
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat with AimBot
        </>
      )}
    </Button>
  );
}
