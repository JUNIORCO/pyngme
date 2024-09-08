import stripe from "@/stripe";
import { schedules } from "@trigger.dev/sdk/v3";
import prisma from "../../../prisma/prisma";

export default async function onUserDelete(clerkUserId: string | undefined) {
  if (!clerkUserId) {
    console.error("Clerk User ID is undefined, skipping user deletion");
    return;
  }

  console.log(
    "Searching for customer on stripe with clerkUserId: ",
    clerkUserId,
  );
  const customer = await stripe.customers.search({
    query: `metadata['clerkUserId']:\'${clerkUserId}\'`,
  });
  console.log("Customer: ", customer);

  if (customer.data.length === 0) {
    console.error("Customer not found on stripe, skipping deletion");
    return;
  }

  const stripeCustomerId = customer.data[0].id;
  console.log("Stripe customer ID: ", stripeCustomerId);

  const res = await stripe.customers.del(stripeCustomerId);
  if (res.deleted) {
    console.log("Deleted customer: ", stripeCustomerId);
  } else {
    console.error("Failed to delete Stripe customer: ", stripeCustomerId);
  }

  const userPyngs = await prisma.pyng.findMany({
    where: {
      OR: [{ clerkUserId }, { stripeCustomerId }],
    },
  });

  for (const pyng of userPyngs) {
    if (pyng.triggerScheduleId) {
      try {
        console.log("Deleting trigger schedule: ", pyng.triggerScheduleId);
        const deletedSchedule = await schedules.del(pyng.triggerScheduleId);
        await prisma.pyng.delete({
          where: {
            id: pyng.id,
          },
        });
        console.log("Deleted schedule: ", deletedSchedule);
      } catch (e) {
        console.error("Failed to delete trigger schedule: ", e);
      }
    } else {
      console.error("Trigger schedule ID not found for pyng: ", pyng.id);
      await prisma.pyng.delete({
        where: {
          id: pyng.id,
        },
      });
    }
  }
}
