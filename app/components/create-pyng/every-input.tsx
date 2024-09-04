import type { EveryOption } from "@prisma/client";
import { TimerReset } from "lucide-react";
import { type UseControllerProps, useController } from "react-hook-form";
import { EVERY_OPTIONS_MAP } from "./every-options-map";
import type { IFormInput } from "./types";

export default function EveryInput(props: UseControllerProps<IFormInput>) {
  const { field } = useController(props);

  return (
    <div className="relative">
      <div className="tooltip" data-tip="Check every">
        <select
          disabled={field.disabled}
          className="select select-bordered w-full max-w-xs pl-10"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {Object.entries(EVERY_OPTIONS_MAP).map(([option, label]) => (
            <option key={option} value={option}>
              {label}
            </option>
          ))}
        </select>
        <TimerReset className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
      </div>
    </div>
  );
}
