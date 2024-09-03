"use client";

import { createPyng } from "@/actions/create-pyng";
import { EveryOption } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EmailDropdown from "./email-dropdown";
import EveryInput from "./every-input";
import ForInput from "./for-input";
import type { IFormInput } from "./types";
import WhenInput from "./when-input";

type CreatePyngFormProps = {
  userEmail: string | undefined;
  userId: string | undefined;
};

export default function CreatePyngForm({
  userEmail,
  userId,
}: CreatePyngFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      userId,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      every: EveryOption.Hour,
    },
  });

  const disabled = isSubmitting;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await createPyng(data);
    reset(undefined, { keepDefaultValues: true });
    toast.success("Pyng created! 🎉");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[40%] self-center"
    >
      <div className="flex flex-col gap-4">
        <EmailDropdown
          control={control}
          name="email"
          disabled={disabled}
          rules={{
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          userEmail={userEmail}
        />
        <WhenInput
          control={control}
          name="when"
          isDisabled={disabled}
          rules={{
            required: true,
          }}
        />
        <ForInput
          control={control}
          name="for"
          isDisabled={disabled}
          rules={{
            required: true,
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
              message: "Invalid URL format",
            },
          }}
        />
      </div>

      <div className="flex justify-end gap-4">
        <EveryInput
          control={control}
          name="every"
          disabled={disabled}
          rules={{
            required: true,
          }}
        />
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          Create Pyng{" "}
          {disabled && <LoaderCircle className="w-4 h-4 animate-spin" />}
        </button>
      </div>
    </form>
  );
}
