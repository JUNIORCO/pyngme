"use client";

import { useUser } from "@clerk/nextjs";
import SetupBilling from "./setup-billing";
import Usage from "./usage";

export default function BillingSection() {
  const { user } = useUser();
  const userSetupSucceeded = user?.publicMetadata.stripeSetupSucceeded as
    | boolean
    | undefined;
  const stripeSubscriptionId = user?.publicMetadata.stripeSubscriptionId as
    | string
    | undefined;
  const stripeCustomerId = user?.publicMetadata.stripeCustomerId as
    | string
    | undefined;
  const stripeSetupIntentId = user?.publicMetadata.stripeSetupIntentId as
    | string
    | undefined;

  return !userSetupSucceeded ? (
    <SetupBilling stripeSetupIntentId={stripeSetupIntentId} />
  ) : (
    <Usage
      stripeCustomerId={stripeCustomerId}
      stripeSubscriptionId={stripeSubscriptionId}
    />
  );
}
