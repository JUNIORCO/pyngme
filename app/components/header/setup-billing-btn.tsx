"use client";

import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import SetupBillingForm from "./setup-billing-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

type SetupBillingBtnProps = {
  clientSecret: string | null;
};

export default function SetupBillingBtn({
  clientSecret,
}: SetupBillingBtnProps) {
  if (!clientSecret) {
    console.error("No client secret provided");
    return null;
  }

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <button
        type="button"
        className="btn btn-accent"
        onClick={() =>
          (
            document.getElementById("stripe_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Setup Billing
      </button>
      <SetupBillingForm />
    </Elements>
  );
}
