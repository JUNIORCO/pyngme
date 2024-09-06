"use client";

import { Title } from "../common";
import CreatePyngForm from "./create-pyng-form";

export default function CreatePyng({
  userEmail,
  clerkUserId,
  stripeSubscriptionId,
}: {
  userEmail: string | undefined;
  clerkUserId: string | undefined;
  stripeSubscriptionId: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Title>Create a Pyng</Title>
      <CreatePyngForm
        userEmail={userEmail}
        clerkUserId={clerkUserId}
        stripeSubscriptionId={stripeSubscriptionId}
      />
    </div>
  );
}
