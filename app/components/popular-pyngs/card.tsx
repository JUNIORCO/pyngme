"use client";

import { useFormContext } from "react-hook-form";
import type { IFormInput } from "../create-pyng/types";

export default function PopularPyngsCard({
  title,
  content,
  userEmail,
}: {
  title: string;
  content: string;
  userEmail: string | undefined;
}) {
  const { setValue } = useFormContext<IFormInput>();

  const handleClick = () => {
    const whenInput = document.getElementById("when-input") as HTMLInputElement;
    const forInput = document.getElementById("for-input") as HTMLInputElement;

    if (whenInput) {
      setValue("when", content);
    }

    if (forInput) {
      forInput.focus();
    }
  };

  return (
    <div className="card w-64 sm:w-72 h-56 bg-base-200 rounded-box">
      <div className="card-body text-center">
        <p>{title}</p>
        <p className="text-xl font-semibold">Pyngme when {content}</p>
        <div className="card-actions">
          <button
            type="button"
            className="btn btn-neutral w-full"
            onClick={handleClick}
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}
