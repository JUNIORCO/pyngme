"use client";

import { PageContentContainer } from "@/components/common";
import CreatePyng from "@/components/create-pyng/create-pyng";
import type { IFormInput } from "@/components/create-pyng/types";
import PopularPyngs from "@/components/popular-pyngs/popular-pyngs";
import { EveryOption } from "@prisma/client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type HomePageContentProps = {
  userEmail: string | undefined;
  clerkUserId: string | undefined;
  stripeCustomerId: string | undefined;
};

export default function HomePageContent({
  userEmail,
  clerkUserId,
  stripeCustomerId,
}: HomePageContentProps) {
  const methods = useForm<IFormInput>({
    defaultValues: {
      email: userEmail,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      every: EveryOption.Hour,
      clerkUserId,
      stripeCustomerId,
    },
  });
  console.log(methods.watch());

  useEffect(() => {
    methods.setValue("email", userEmail);
  }, [userEmail]);

  useEffect(() => {
    methods.setValue("clerkUserId", clerkUserId);
  }, [clerkUserId]);

  useEffect(() => {
    methods.setValue("stripeCustomerId", stripeCustomerId);
  }, [stripeCustomerId]);

  return (
    <PageContentContainer>
      <FormProvider {...methods}>
        <CreatePyng clerkUserId={clerkUserId} />
        <PopularPyngs userEmail={userEmail} />
      </FormProvider>
    </PageContentContainer>
  );
}
