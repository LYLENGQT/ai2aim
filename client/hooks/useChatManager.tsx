import { useState, useEffect } from "react";

export default function useChatManager() {
  const [showModal, setShowModal] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeen = localStorage.getItem('chatbase-modal-seen');
    if (!hasSeen) {
      // Show modal after 2 seconds delay
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setHasSeenModal(true);
    // Remember that user has seen the modal
    localStorage.setItem('chatbase-modal-seen', 'true');
  };

  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("open");
    }
  };

  return {
    showModal,
    closeModal,
    openChat,
    hasSeenModal
  };
}
