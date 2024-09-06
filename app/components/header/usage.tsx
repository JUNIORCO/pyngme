"use client";

import { fetchUsage } from "@/actions/fetch-usage";
import { useEffect, useState } from "react";

type UsageProps = {
  stripeSubscriptionId: string | undefined;
  stripeCustomerId: string | undefined;
};

export default function Usage({
  stripeCustomerId,
  stripeSubscriptionId,
}: UsageProps) {
  if (!stripeCustomerId) {
    console.error("Stripe customer ID not found");
    return null;
  }
  if (!stripeSubscriptionId) {
    console.error("Stripe subscription ID not found");
    return null;
  }

  const [totalUsage, setTotalUsage] = useState(0);

  useEffect(() => {
    const getUsage = async () => {
      const totalUsage = await fetchUsage(
        stripeCustomerId,
        stripeSubscriptionId,
      );
      setTotalUsage(totalUsage);
    };

    getUsage();
  }, [stripeCustomerId, stripeSubscriptionId]);

  return (
    <button
      type="button"
      className="btn btn-ghost no-animation pointer-events-none select-text"
    >
      Usage
      <div className="badge">{totalUsage} runs</div>
    </button>
  );
}
