import { type UseControllerProps, useController } from "react-hook-form";
import type { IFormInput } from "./types";

export default function ForInput({
  isDisabled,
  ...props
}: UseControllerProps<IFormInput> & { isDisabled: boolean }) {
  const { field, fieldState } = useController(props);

  return (
    <div className="w-full">
      <label
        className={`input input-bordered ${
          fieldState.error ? "input-error" : ""
        } flex items-center gap-12 w-full`}
      >
        <p className="font-medium">For</p>
        <input
          {...field}
          type="text"
          className="grow w-full"
          placeholder="johnswebsite.com"
          disabled={isDisabled}
          value={field.value || ""}
        />
      </label>
      {fieldState.error && (
        <div className="label justify-end pb-0">
          <span className="label-text-alt text-error">
            {fieldState.error.type === "required"
              ? "For is required"
              : fieldState.error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
