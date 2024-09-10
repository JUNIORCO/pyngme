import { currentUser } from "@clerk/nextjs/server";
import SetupBilling from "./setup-billing";
import Usage from "./usage";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import stripe from "@/stripe";
import { createClerkClient } from "@clerk/nextjs/server";

async function fetchUsage(
  clerkUserId: string,
  stripeCustomerId: unknown,
  stripeSubscriptionId: unknown,
) {
  if (!clerkUserId || !stripeCustomerId || !stripeSubscriptionId) {
    return null;
  }

  if (typeof stripeCustomerId !== 'string' || typeof stripeSubscriptionId !== 'string') {
    return null;
  }

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

export default async function BillingSection() {
  const user = await currentUser()

  if (!user) {
    return null;
  }

  const stripeSetupSucceeded = user?.publicMetadata?.stripeSetupSucceeded
  const stripeSubscriptionId = user?.publicMetadata?.stripeSubscriptionId
  const stripeCustomerId = user?.publicMetadata?.stripeCustomerId
  const stripeSetupIntentId = user?.publicMetadata?.stripeSetupIntentId

  const totalUsage = await fetchUsage(user.id, stripeCustomerId, stripeSubscriptionId)

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {!stripeSetupSucceeded ? (
        <Suspense fallback={
          <button type="button" className="btn btn-secondary btn-disabled">
            Loading <LoaderCircle className="w-4 h-4 animate-spin" />
          </button>
        }>
          <SetupBilling stripeSetupIntentId={stripeSetupIntentId} />
        </Suspense>
      ) : null}
      
      <Usage totalUsage={totalUsage} stripeSetupSucceeded={stripeSetupSucceeded} />
    </div>
  );
}
