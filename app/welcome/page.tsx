"use client";

import Routes from "@/routes";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [countdown, setCountdown] = useState(5);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    setIsButtonEnabled(true);
  }, [countdown]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <p className="text-3xl font-bold">Welcome to Pyngme!</p>
      <img
        src="/minions-excited.gif"
        alt="Welcome"
        className="rounded-lg w-[40%]"
      />
      {isButtonEnabled ? null : (
        <p className="text-xl">Setting up your account...</p>
      )}
      <a href={Routes.hub}>
        <button
          type="button"
          className={`btn btn-lg btn-accent btn-wide ${!isButtonEnabled ? "btn-disabled" : ""}`}
          disabled={!isButtonEnabled}
        >
          {isButtonEnabled ? (
            "Back to hub"
          ) : (
            <div className="flex items-center">
              <span className="font-bold">{countdown}</span>s{" "}
              <LoaderCircle className="w-6 h-6 ml-2 animate-spin" />
            </div>
          )}
        </button>
      </a>
    </div>
  );
}
