"use client";

import { MousePointerClick } from "lucide-react";
import Image from "next/image";
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
        onClick={() =>
          openModal(
            <video loop controls>
              <source
                src="https://pub-2cca69ba197d421a909e93dc4579c0c5.r2.dev/pyngme_full.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>,
          )
        }
      >
        How it works <MousePointerClick className="w-4 h-4" />
      </button>
      <Title className="text-center">Pyngme</Title>
      <CreatePyngForm clerkUserId={clerkUserId} />
      <Modal content={content} closeModal={closeModal} />
    </div>
  );
}
