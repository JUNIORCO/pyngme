import { PageContentContainer, Title } from "@/components/common";
import Routes from "@/routes";
import { currentUser } from "@clerk/nextjs/server";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import type { FC, ReactNode } from "react";

export default async function PricingPage() {
  const user = await currentUser();

  const HelperBtn: FC<{
    content: ReactNode;
  }> = ({ content }) => {
    return (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost btn-xs"
        >
          <InfoIcon className="w-4 h-4" />
        </div>
        <div
          tabIndex={0}
          className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow"
        >
          <div tabIndex={0} className="card-body">
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageContentContainer>
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-xl font-semibold">Simple, Affordable, Flexible</p>
        <div className="flex flex-col gap-2 my-6 justify-center items-center">
          <p className="text-2xl font-bold">100 free runs per month, then</p>
          <p className="text-4xl font-bold">$0.005 per run</p>
        </div>
        {!user ? (
          <Link href={Routes.signUp}>
            <button type="button" className="btn btn-primary btn-lg btn-wide">
              Get Started For Free
            </button>
          </Link>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <Title>Estimate Your Usage</Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p className="font-bold">Low Usage</p>
              <p>2 Pyngs, each runs every 4 hours</p>
              <h2 className="card-title" style={{ gap: "0px" }}>
                $1.75 per month
                <HelperBtn
                  content={
                    <p>
                      2 Pyngs <br />
                      &times; 6 times a day <br />
                      &times; 30 days <br />
                      &times; $0.005 / run <br />
                      &minus; 100 free runs ($0.5) <br />= $1.75 / mo
                    </p>
                  }
                />
              </h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p className="font-bold">Medium Usage</p>
              <p>10 Pyngs</p>
              <p>5 run every hour, 5 run every 15 mins</p>
              <h2 className="card-title" style={{ gap: "0px" }}>
                $89.5 per month
                <HelperBtn
                  content={
                    <p>
                      (5 Pyngs &times; 24 times a day <br />+ 5 Pyngs &times; 96
                      times a day) <br />
                      &times; 30 days <br />
                      &times; $0.005 / run <br />
                      &minus; 100 free runs ($0.5) <br />= $89.5 / mo
                    </p>
                  }
                />
              </h2>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <p className="font-bold">High Usage</p>
              <p>25 Pyngs, each runs every 15 mins</p>
              <h2 className="card-title" style={{ gap: "0px" }}>
                $359.5 / month
                <HelperBtn
                  content={
                    <p>
                      25 Pyngs <br />
                      &times; 96 times a day <br />
                      &times; 30 days <br />
                      &times; $0.005 / run <br />
                      &minus; 100 free runs ($0.5) <br />= $359.5 / mo
                    </p>
                  }
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <Title>FAQ</Title>
        <div className="flex flex-col gap-4">
          <div className="collapse collapse-arrow bg-base-200 shadow-md">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is a Pyng and a run?
            </div>
            <div className="collapse-content">
              <p>
                A Pyng is a task that monitors a condition for a website. A run
                is an execution of a Pyng to check the condition.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 shadow-md">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Can I delete a Pyng anytime?
            </div>
            <div className="collapse-content">
              <p>
                A Pyng can be deleted anytime. If you delete a Pyng, it will not
                run anymore and you will not be billed for it. You will only be
                billed for the runs that the Pyng has completed before it was
                deleted.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 shadow-md">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Is there a free tier?
            </div>
            <div className="collapse-content">
              <p>Not at this time.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 shadow-md">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What is the billing cycle?
            </div>
            <div className="collapse-content">
              <p>
                Billing is done on a monthly basis. You will be billed at the
                start of each month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContentContainer>
  );
}
