import type { TriggerConfig } from "@trigger.dev/sdk/v3";

export const config: TriggerConfig = {
  project: "proj_zwwvmsrcvdmchfzvwgru",
  logLevel: "log",
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  triggerDirectories: ["app/trigger"],
  additionalFiles: ["./prisma/schema.prisma"],
  additionalPackages: [
    "prisma@5.19.1",
    "openai@4.57.1",
    "resend@4.0.0",
    "zod@3.23.8",
  ],
};
