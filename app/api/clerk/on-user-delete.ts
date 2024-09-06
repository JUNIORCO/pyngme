import stripe from "@/stripe";

export default async function onUserDelete(userId: string | undefined) {
  if (!userId) {
    console.error("User ID is undefined, skipping user deletion");
    return;
  }

  console.log("Searching for customer on stripe with clerkUserId: ", userId);
  const customer = await stripe.customers.search({
    query: `metadata['clerkUserId']:\'${userId}\'`,
  });
  console.log("Customer: ", customer);

  if (customer.data.length === 0) {
    console.error("Customer not found on stripe, skipping deletion");
    return;
  }

  const customerId = customer.data[0].id;
  console.log("Stripe customer ID: ", customerId);

  const res = await stripe.customers.del(customerId);
  if (res.deleted) {
    console.log("Deleted customer: ", customerId);
  } else {
    console.error("Failed to delete Stripe customer: ", customerId);
  }
}
