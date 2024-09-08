"use client";

import { MousePointerClick } from "lucide-react";
import { Title } from "../common";
import Modal from "../modal/modal";
import { useModal } from "../modal/useModal";
import CreatePyngForm from "./create-pyng-form";

export default function CreatePyng({
  clerkUserId,
}: {
  clerkUserId: string | undefined;
}) {
  const { openModal, closeModal, content } = useModal();

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="btn btn-sm w-fit self-center mb-4"
        onClick={() => openModal(<p>A video on how it works</p>)}
      >
        How it works <MousePointerClick className="w-4 h-4" />
      </button>
      <Title className="text-center">Pyngme</Title>
      <CreatePyngForm clerkUserId={clerkUserId} />
      <Modal content={content} closeModal={closeModal} />
    </div>
  );
}
