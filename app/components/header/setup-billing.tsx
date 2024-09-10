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

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const getSetupIntent = async () => {
      const { client_secret } = await fetchSetupIntent(stripeSetupIntentId);
      setClientSecret(client_secret);
    };
    getSetupIntent();
  }, []);

  return clientSecret ? (
    <SetupBillingBtn clientSecret={clientSecret} />
  ) : (
    <button type="button" className="btn btn-secondary btn-disabled">
      Loading <LoaderCircle className="w-4 h-4 animate-spin" />
    </button>
  );
}
