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

  // Hide default Chatbase widget button but keep the widget itself
  useEffect(() => {
    const hideDefaultWidget = () => {
      // Only hide the button, not the widget itself
      const buttonSelectors = [
        '.chatbase-widget-button',
        'div[style*="position: fixed"][style*="bottom"][style*="right"]:not(.floating-chat-custom)'
      ];
      
      buttonSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!el.classList.contains('floating-chat-custom')) {
            el.style.display = 'none';
          }
        });
      });
    };

    // Run after a delay to let Chatbase initialize
    const timer = setTimeout(hideDefaultWidget, 2000);
    const interval = setInterval(hideDefaultWidget, 1000);
    setTimeout(() => clearInterval(interval), 10000);

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
