"use server";

import stripe from "@/stripe";
import { createClerkClient } from "@clerk/nextjs/server";

export async function fetchUsage(
  clerkUserId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
) {
  const subscription =
    await stripe.subscriptions.retrieve(stripeSubscriptionId);

  const meterEventSummariesPromise = stripe.billing.meters.listEventSummaries(
    process.env.STRIPE_METER_ID as string,
    {
      customer: stripeCustomerId,
      start_time: subscription.current_period_start,
      end_time: subscription.current_period_end,
      limit: 100,
    },
  );

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY as string,
  });
  const clerkUserPromise = clerkClient.users.getUser(clerkUserId);

  const [meterEventSummaries, clerkUser] = await Promise.all([
    meterEventSummariesPromise,
    clerkUserPromise,
  ]);

  const totalUsage = meterEventSummaries.data.reduce((acc, curr) => {
    return acc + curr.aggregated_value;
  }, 0);
  const clerkRunCount = clerkUser.publicMetadata.runCount as number;

  return totalUsage + clerkRunCount;
}
