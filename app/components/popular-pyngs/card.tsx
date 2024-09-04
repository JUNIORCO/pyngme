import type { ComponentProps } from "react";

type CardType =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "error"
  | "warning";

export default function PopularPyngsCard({
  title,
  type,
}: {
  title: string;
  type: CardType;
}) {
  const bgColorMap: Record<CardType, ComponentProps<"div">["className"]> = {
    primary: "card-polka",
    secondary: "card-diagonal2",
    accent: "card-cross",
    success: "card-zigzag",
    error: "card-diagonal",
    warning: "card-circles",
  };

  return (
    <div
      className={`card w-64 sm:w-72 h-[16rem] rounded-box ${bgColorMap[type]}`}
    >
      <div className="card-body">
        <h2 className="card-title justify-center">{title}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button type="button" className="btn w-full">
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}
