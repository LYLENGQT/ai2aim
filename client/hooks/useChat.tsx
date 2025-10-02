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

  // Hide default Chatbase widget
  useEffect(() => {
    const hideDefaultWidget = () => {
      const selectors = [
        '[data-chatbase-widget]',
        '.chatbase-widget-button',
        'div[style*="position: fixed"][style*="bottom"]',
        'iframe[src*="chatbase"]',
        'div[class*="chatbase"]',
        'div[id*="chatbase"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!el.classList.contains('floating-chat-custom')) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          }
        });
      });
    };

    // Run immediately and then every 500ms for the first 5 seconds
    hideDefaultWidget();
    const interval = setInterval(hideDefaultWidget, 500);
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
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
