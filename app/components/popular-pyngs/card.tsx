"use client";

import { useEffect, useRef } from "react";

export default function PopularPyngsCard({
  title,
  content,
  userEmail,
}: {
  title: string;
  content: string;
  userEmail: string | undefined;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = () => {
      const emailInput = document.getElementById(
        "email-input",
      ) as HTMLInputElement;
      const whenInput = document.getElementById(
        "when-input",
      ) as HTMLInputElement;
      const forInput = document.getElementById("for-input") as HTMLInputElement;

      if (emailInput) {
        emailInput.scrollIntoView({ behavior: "smooth" });
        if (userEmail) {
          emailInput.value = userEmail;
          if (forInput) {
            forInput.focus();
          }
        } else {
          emailInput.focus();
        }
      }

      if (whenInput) {
        whenInput.value = content;
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [content, userEmail]);

  return (
    <div className="card w-64 sm:w-72 h-56 bg-base-200 rounded-box">
      <div className="card-body text-center">
        <p>{title}</p>
        <p className="text-xl font-semibold">Pyngme when {content}</p>
        <div className="card-actions">
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-outline w-full"
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}
