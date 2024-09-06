"use server";

import stripe from "@/stripe";

export async function fetchUsage(
  stripeCustomerId: string,
  stripeSubscriptionId: string,
) {
  const subscription =
    await stripe.subscriptions.retrieve(stripeSubscriptionId);

  const meterEventSummaries = await stripe.billing.meters.listEventSummaries(
    process.env.STRIPE_METER_ID as string,
    {
      customer: stripeCustomerId,
      start_time: subscription.current_period_start,
      end_time: subscription.current_period_end,
      limit: 100,
    },
  );

  const totalUsage = meterEventSummaries.data.reduce((acc, curr) => {
    return acc + curr.aggregated_value;
  }, 0);

  return totalUsage;
}
