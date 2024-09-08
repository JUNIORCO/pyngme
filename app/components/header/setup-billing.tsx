"use client";

import { fetchSetupIntent } from "@/actions/fetch-setup-intent";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type Stripe from "stripe";
import SetupBillingBtn from "./setup-billing-btn";

type SetupBillingProps = {
  stripeSetupIntentId: string | undefined;
};

export default function SetupBilling({
  stripeSetupIntentId,
}: SetupBillingProps) {
  if (!stripeSetupIntentId) {
    console.error("No stripe setup intent id provided");
    return null;
  }

  const [setupIntent, setSetupIntent] = useState<Stripe.SetupIntent | null>(
    null,
  );

  useEffect(() => {
    const getSetupIntent = async () => {
      const setupIntent = await fetchSetupIntent(stripeSetupIntentId);
      setSetupIntent(setupIntent);
    };
    getSetupIntent();
  }, []);

  return setupIntent ? (
    <SetupBillingBtn clientSecret={setupIntent.client_secret} />
  ) : (
    <button type="button" className="btn btn-secondary btn-disabled">
      Loading <LoaderCircle className="w-4 h-4 animate-spin" />
    </button>
  );
}
