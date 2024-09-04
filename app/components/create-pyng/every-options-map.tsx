import type { EveryOption } from "@prisma/client";

export const EVERY_OPTIONS_MAP: Record<EveryOption, string> = {
  FifteenMinutes: "15 mins",
  Hour: "hour",
  FourHours: "4 hours",
  Day: "day",
};
