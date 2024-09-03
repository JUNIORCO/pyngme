import type { EveryOption } from "@prisma/client";

export type IFormInput = {
  userId: string;
  timezone: string;
  email: string;
  when: string;
  for: string;
  every: EveryOption;
};
