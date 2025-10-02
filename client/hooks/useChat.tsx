import { useState, useEffect } from "react";

export default function useChat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeen = localStorage.getItem("chatbase-modal-seen");
    if (!hasSeen) {
      // Show modal after 2 seconds
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Hide only the default Chatbase button, not the widget
  useEffect(() => {
    const hideDefaultButton = () => {
      // Only target the specific button class
      const buttonElements = document.querySelectorAll('.chatbase-widget-button');
      buttonElements.forEach(el => {
        el.style.display = 'none';
      });
    };

    // Run after Chatbase has had time to initialize
    const timer = setTimeout(hideDefaultButton, 3000);
    const interval = setInterval(hideDefaultButton, 2000);
    setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const openChat = () => {
    console.log("Attempting to open chat...");
    console.log("window.chatbase available:", !!window.chatbase);
    
    if (window.chatbase) {
      try {
        window.chatbase("open");
        console.log("Chatbase open command sent");
        
        // Check if widget is visible after opening
        setTimeout(() => {
          const widget = document.querySelector('[data-chatbase-widget]') || 
                        document.querySelector('.chatbase-widget') ||
                        document.querySelector('iframe[src*="chatbase"]');
          console.log("Widget found after open:", !!widget);
          if (widget) {
            console.log("Widget styles:", {
              display: widget.style.display,
              visibility: widget.style.visibility,
              opacity: widget.style.opacity,
              zIndex: widget.style.zIndex
            });
          }
        }, 1000);
      } catch (error) {
        console.error("Error opening chatbase:", error);
      }
    } else {
      console.warn("Chatbase not available yet, retrying in 1 second...");
      setTimeout(() => {
        if (window.chatbase) {
          window.chatbase("open");
          console.log("Chatbase opened after retry");
        } else {
          console.error("Chatbase still not available after retry");
        }
      }, 1000);
    }
  };

  const closeChat = () => {
    if (window.chatbase) {
      window.chatbase("close");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setHasSeenModal(true);
    localStorage.setItem("chatbase-modal-seen", "true");
  };

  const handleModalChat = () => {
    openChat();
    handleModalClose();
  };

  return {
    isModalOpen,
    hasSeenModal,
    openChat,
    closeChat,
    handleModalClose,
    handleModalChat,
  };
}
