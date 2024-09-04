import { type UseControllerProps, useController } from "react-hook-form";
import type { IFormInput } from "./types";

export default function WhenInput({
  isDisabled,
  ...props
}: UseControllerProps<IFormInput> & { isDisabled: boolean }) {
  const { field, fieldState } = useController(props);

  return (
    <div className="w-full">
      <label
        className={`input input-bordered ${
          fieldState.error ? "input-error" : ""
        } flex items-center gap-7 w-full`}
      >
        <p className="font-medium">When</p>
        <input
          {...field}
          id="when-input"
          type="text"
          className="grow w-full"
          placeholder="a new blog post is published"
          disabled={isDisabled}
          value={field.value || ""}
        />
      </label>
      {fieldState.error && (
        <div className="label justify-end pb-0">
          <span className="label-text-alt text-error">
            {fieldState.error.type === "required"
              ? "When is required"
              : fieldState.error?.message}
          </span>
        </div>
      )}
    </div>
  );
}
