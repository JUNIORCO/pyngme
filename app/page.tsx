"use client";

import { useUser } from "@clerk/nextjs";
import HomePageContent from "./page-content";

export default function HomePage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const clerkUserId = user?.id;
  const stripeSubscriptionId = user?.publicMetadata.stripeSubscriptionId as
    | string
    | undefined;
  const stripeCustomerId = user?.publicMetadata.stripeCustomerId as
    | string
    | undefined;

  return (
    <HomePageContent
      userEmail={userEmail}
      clerkUserId={clerkUserId}
      stripeSubscriptionId={stripeSubscriptionId}
      stripeCustomerId={stripeCustomerId}
    />
  );
}
