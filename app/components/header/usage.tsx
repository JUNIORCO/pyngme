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

  const [loading, setLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState(0);

  useEffect(() => {
    const getUsage = async () => {
      setLoading(true);
      const totalUsage = await fetchUsage(
        stripeCustomerId,
        stripeSubscriptionId,
      );
      setTotalUsage(totalUsage);
      setLoading(false);
    };

    getUsage();
  }, [stripeCustomerId, stripeSubscriptionId]);

  return (
    <button
      type="button"
      className="btn btn-ghost no-animation pointer-events-none"
    >
      Usage
      <div className="badge badge-secondary">
        {loading ? (
          <span className="loading loading-dots loading-xs" />
        ) : (
          `${totalUsage.toLocaleString()} runs`
        )}
      </div>
    </button>
  );
}
