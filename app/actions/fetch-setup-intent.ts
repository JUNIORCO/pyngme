"use server";

import stripe from "@/stripe";

export async function fetchSetupIntent(stripeSetupIntentId: string) {
  const setupIntent = await stripe.setupIntents.retrieve(stripeSetupIntentId);
  return {
    client_secret: setupIntent.client_secret,
  };
}
