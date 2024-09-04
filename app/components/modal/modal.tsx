"use client";

import { X } from "lucide-react";

type ModalProps = {
  content: React.ReactNode;
  closeModal: () => void;
};

export default function Modal({ content, closeModal }: ModalProps) {
  return (
    <dialog id="dynamic_modal" className="modal">
      <div className="modal-box max-w-[60vw]">
        <div className="modal-action mt-0">
          <button type="button" className="btn btn-md" onClick={closeModal}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {content}
      </div>
    </dialog>
  );
}
