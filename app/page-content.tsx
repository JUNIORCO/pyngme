"use client";

import { EveryOption } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { PageContentContainer } from "./components/common";
import CreatePyng from "./components/create-pyng/create-pyng";
import type { IFormInput } from "./components/create-pyng/types";
import PopularPyngs from "./components/popular-pyngs/popular-pyngs";

type HomePageContentProps = {
  userEmail: string | undefined;
  userId: string | undefined;
};

export default function HomePageContent({
  userEmail,
  userId,
}: HomePageContentProps) {
  const methods = useForm<IFormInput>({
    defaultValues: {
      userId,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      every: EveryOption.Hour,
    },
  });

  return (
    <PageContentContainer>
      <FormProvider {...methods}>
        <CreatePyng userEmail={userEmail} userId={userId} />
        <PopularPyngs userEmail={userEmail} />
      </FormProvider>
    </PageContentContainer>
  );
}
