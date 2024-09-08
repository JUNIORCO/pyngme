"use client";

import { fetchUsage } from "@/actions/fetch-usage";
import { MAX_FREE_RUNS_PER_MONTH } from "@/trigger/constants";
import { useEffect, useState } from "react";

type UsageProps = {
  clerkUserId: string | undefined;
  stripeSubscriptionId: string | undefined;
  stripeCustomerId: string | undefined;
  stripeSetupSucceeded: boolean | undefined;
};

export default function Usage({
  clerkUserId,
  stripeCustomerId,
  stripeSubscriptionId,
  stripeSetupSucceeded,
}: UsageProps) {
  if (!clerkUserId) {
    console.error("Clerk user ID not found");
    return null;
  }
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

  const hasReachedMaxFreeRuns =
    totalUsage >= MAX_FREE_RUNS_PER_MONTH && !stripeSetupSucceeded;

  useEffect(() => {
    const getUsage = async () => {
      setLoading(true);
      const totalUsage = await fetchUsage(
        clerkUserId,
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
          `${totalUsage.toLocaleString()} run${totalUsage === 1 ? "" : "s"}`
        )}
      </div>
      {hasReachedMaxFreeRuns && (
        <div className="badge badge-error">Max free runs.</div>
      )}
    </button>
  );
}
