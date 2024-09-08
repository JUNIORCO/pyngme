"use client";

import { createPyng } from "@/actions/create-pyng";
import Routes from "@/routes";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import EveryInput from "./every-input";
import ForInput from "./for-input";
import type { IFormInput } from "./types";
import WhenInput from "./when-input";

type CreatePyngFormProps = {
  clerkUserId: string | undefined;
};

export default function CreatePyngForm({ clerkUserId }: CreatePyngFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting: disabled },
    reset,
  } = useFormContext<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!clerkUserId) {
      toast.success(
        <p>
          <Link href={Routes.signUp} className="link">
            Sign up
          </Link>{" "}
          to create this Pyng!
        </p>,
        {
          icon: "🚀",
          duration: 3500,
        },
      );
      return;
    }

    toast.success("Hold on, this takes a few seconds...", {
      icon: "⏳",
      duration: 6000,
    });

    const result = await createPyng(data);
    if (!result.success || result.error) {
      toast.error("Sorry, something went wrong. Please try again", {
        duration: 3500,
      });
      return;
    }

    reset(undefined, { keepDefaultValues: true });
    toast.success(
      <p>
        Pyng created! See it{" "}
        <Link href={Routes.pyngs} className="link">
          here
        </Link>
      </p>,
      {
        duration: 3500,
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full md:w-[40%] self-center"
    >
      <div className="flex flex-col gap-4">
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
            validate: (value) => {
              if (!value) {
                return "Required";
              }

              const socialMediaBlocklist = [
                "facebook.com",
                "x.com",
                "twitter.com",
                "instagram.com",
                "linkedin.com",
                "snapchat.com",
                "tiktok.com",
                "reddit.com",
                "tumblr.com",
                "flickr.com",
                "whatsapp.com",
                "wechat.com",
                "telegram.org",
                "researchhub.com",
                "youtube.com",
                "corterix.com",
                "southwest.com",
                "ryanair.com",
              ];

              const lowerCaseValue = value.toLowerCase();

              for (const blocklistItem of socialMediaBlocklist) {
                if (lowerCaseValue.includes(blocklistItem)) {
                  return "We can't use this URL for policy reasons";
                }
              }

              return true;
            },
            pattern: {
              value:
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
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
