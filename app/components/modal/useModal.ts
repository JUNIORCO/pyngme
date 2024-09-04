"use client";

import { type ReactNode, useCallback, useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
    const modal = document.getElementById("dynamic_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    const modal = document.getElementById("dynamic_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }, []);

  return {
    isOpen,
    content,
    openModal,
    closeModal,
  };
}
