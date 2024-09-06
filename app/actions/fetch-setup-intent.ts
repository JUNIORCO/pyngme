"use server";

import stripe from "@/stripe";

export async function fetchSetupIntent(stripeSetupIntentId: string) {
  return await stripe.setupIntents.retrieve(stripeSetupIntentId);
}
