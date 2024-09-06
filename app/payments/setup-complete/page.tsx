"use client";

import PaymentStatus from "@/components/payment-status";
import Routes from "@/routes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function PaymentsSetupComplete() {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <p>Payment Status</p>
        <PaymentStatus />
        <Link href={Routes.hub}>
          <button type="button" className="btn btn-outline btn-wide">
            Back to hub
          </button>
        </Link>
      </div>
    </Elements>
  );
}
