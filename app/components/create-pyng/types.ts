import type { EveryOption } from "@prisma/client";

export type IFormInput = {
  timezone: string;
  email: string | undefined;
  when: string;
  for: string;
  every: EveryOption;
  clerkUserId: string | undefined;
  stripeCustomerId: string | undefined;
};
