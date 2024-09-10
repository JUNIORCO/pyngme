"use client";

import { useUser } from "@clerk/nextjs";
import SetupBilling from "./setup-billing";
import Usage from "./usage";

export default function BillingSection() {
  const { user } = useUser();
  const clerkUserId = user?.id;
  const stripeSetupSucceeded = user?.publicMetadata.stripeSetupSucceeded as
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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {!stripeSetupSucceeded ? (
        <SetupBilling stripeSetupIntentId={stripeSetupIntentId} />
      ) : null}
      <Usage
        stripeCustomerId={stripeCustomerId}
        stripeSubscriptionId={stripeSubscriptionId}
        clerkUserId={clerkUserId}
        stripeSetupSucceeded={stripeSetupSucceeded}
      />
    </div>
  );
}
