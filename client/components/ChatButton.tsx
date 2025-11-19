import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";

interface ChatButtonProps {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function ChatButton({ 
  children, 
  variant = "default", 
  size = "default",
  className,
  onClick
}: ChatButtonProps) {
  const { openSidebar } = useSidebar();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      openSidebar();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children || (
        <>
          <MessageCircle className="mr-2 h-4 w-4" />
          Get Help
        </>
      )}
    </Button>
  );
}
