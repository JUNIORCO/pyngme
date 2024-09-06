"use client";

import { EveryOption } from "@prisma/client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PageContentContainer } from "./components/common";
import CreatePyng from "./components/create-pyng/create-pyng";
import type { IFormInput } from "./components/create-pyng/types";
import PopularPyngs from "./components/popular-pyngs/popular-pyngs";

type HomePageContentProps = {
  userEmail: string | undefined;
  clerkUserId: string | undefined;
  stripeSubscriptionId: string | undefined;
  stripeCustomerId: string | undefined;
  stripeSetupSucceeded: boolean | undefined;
};

export default function HomePageContent({
  userEmail,
  clerkUserId,
  stripeSubscriptionId,
  stripeCustomerId,
  stripeSetupSucceeded,
}: HomePageContentProps) {
  const methods = useForm<IFormInput>({
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      every: EveryOption.Hour,
      clerkUserId,
      stripeCustomerId,
    },
  });

  useEffect(() => {
    methods.setValue("clerkUserId", clerkUserId);
  }, [clerkUserId]);

  useEffect(() => {
    methods.setValue("stripeCustomerId", stripeCustomerId);
  }, [stripeCustomerId]);

  return (
    <PageContentContainer>
      <FormProvider {...methods}>
        <CreatePyng
          userEmail={userEmail}
          clerkUserId={clerkUserId}
          stripeSubscriptionId={stripeSubscriptionId}
          stripeSetupSucceeded={stripeSetupSucceeded}
        />
        <PopularPyngs userEmail={userEmail} />
      </FormProvider>
    </PageContentContainer>
  );
}
