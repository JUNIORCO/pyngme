"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { LoaderCircle, XIcon } from "lucide-react";
import { type FormEventHandler, useState } from "react";

export default function SetupBillingForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded
      return null;
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/setup-complete`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(
        error.message || "Something went wrong, please try again later.",
      );
    }

    setLoading(false);
  };

  return (
    <dialog id="stripe_modal" className="modal">
      <div className="modal-box">
        <form method="dialog" className="flex justify-end mb-2">
          <button type="submit" className="btn btn-sm btn-circle btn-ghost">
            <XIcon className="w-4 h-4" />
          </button>
        </form>
        <div>
          <h3 className="text-lg font-bold">Setup Billing (Optional)</h3>
          <p>
            You need to setup billing to use more than 100 Pyngs per month.
            Otherwise, this step is completely optional!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full"
            disabled={!stripe || loading}
          >
            {loading ? (
              <p>
                Loading{" "}
                <LoaderCircle className="w-4 h-4 inline-block animate-spin" />
              </p>
            ) : (
              "Submit"
            )}
          </button>
          {errorMessage && (
            <div className="text-error mt-4 flex justify-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </dialog>
  );
}
