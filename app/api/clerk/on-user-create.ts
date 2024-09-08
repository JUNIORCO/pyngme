import stripe from "@/stripe";
import type { UserJSON } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import type Stripe from "stripe";

export default async function onUserCreate(data: UserJSON) {
  const customersWithEmail = await stripe.customers.search({
    query: `email:\'${data.email_addresses[0].email_address}\'`,
  });
  console.log("Found customers with email: ", customersWithEmail.data.length);

  if (customersWithEmail.data.length > 0) {
    console.error("Customer already exists: ", customersWithEmail.data[0].id);
    return;
  }

  const customer = await stripe.customers.create({
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_address,
    metadata: {
      clerkUserId: data.id,
    },
  });

  console.log("Created customer: ", customer);

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: process.env.STRIPE_PRICE_ID as string,
      },
    ],
    expand: ["pending_setup_intent"],
  });

  console.log("Created subscription: ", subscription.id);
  const setupIntentId = (
    subscription.pending_setup_intent as Stripe.SetupIntent
  ).id;

  console.log("Setup intent id: ", setupIntentId);

  const clerk = clerkClient();
  const updatedUser = await clerk.users.updateUserMetadata(data.id, {
    publicMetadata: {
      runCount: 0,
      stripeCustomerId: customer.id,
      stripeSetupIntentId: setupIntentId,
      stripeSubscriptionId: subscription.id,
      stripeSetupSucceeded: false,
    },
  });

  console.log("Updated user: ", updatedUser);
}
