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

  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("open");
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
