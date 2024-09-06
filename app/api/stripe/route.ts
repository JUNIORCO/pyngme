import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  const signature = headerPayload.get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      payloadString,
      signature,
      webhookSecret,
    );
    return event;
  } catch (err) {
    console.error(err);
    throw new Error(`Webhook Error: ${err}`);
  }
}

export async function POST(request: Request) {
  try {
    console.log("Inside Stripe Webhook");
    const event = await validateRequest(request);
    console.log("Event type: ", event.type);

    switch (event.type) {
      case "setup_intent.succeeded": {
        console.log("Setup intent succeeded");
        const setupIntent = event.data.object as Stripe.SetupIntent;
        const customerId = setupIntent.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) {
          throw new Error("Customer has been deleted.");
        }

        const clerkUserId = customer.metadata.clerkUserId as string | undefined;
        if (!clerkUserId) {
          throw new Error("Clerk user ID not found on customer.");
        }

        const clerk = clerkClient();
        await clerk.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            stripeSetupSucceeded: true,
          },
        });
        break;
      }
    }

    revalidatePath("/");

    return Response.json({ received: true });
  } catch (e) {
    console.error(e);
    return new Response("Webhook Error", { status: 400 });
  }
}
