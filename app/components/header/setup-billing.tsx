import stripe from "@/stripe";
import SetupBillingBtn from "./setup-billing-btn";

type SetupBillingProps = {
  stripeSetupIntentId: unknown;
};

export default async function SetupBilling({
  stripeSetupIntentId,
}: SetupBillingProps) {
  if (!stripeSetupIntentId || typeof stripeSetupIntentId !== 'string') {
    console.error("No stripe setup intent id provided");
    return null;
  }

  const setupIntent = await stripe.setupIntents.retrieve(stripeSetupIntentId);

  if (!setupIntent) {
    return null;
  }

  return <SetupBillingBtn clientSecret={setupIntent.client_secret} />
}
