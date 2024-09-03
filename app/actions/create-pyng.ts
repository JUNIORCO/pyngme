"use server";

import type { IFormInput } from "@/components/create-pyng/types";
import { EveryOption } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";
import prisma from "../../prisma/prisma";
import { pyngTask } from "../trigger/pyng";

export async function createPyng(data: IFormInput) {
  try {
    const pyng = await prisma.pyng.create({
      data: {
        userId: data.userId,
        email: data.email,
        every: data.every,
        timezone: data.timezone,
        url: data.for,
        condition: data.when,
      },
    });

    const everyOptionToCronMap: Record<EveryOption, string> = {
      [EveryOption.FifteenMinutes]: "*/15 * * * *",
      [EveryOption.Hour]: "0 * * * *",
      [EveryOption.FourHours]: "0 */4 * * *",
      [EveryOption.Day]: "0 0 * * *",
    };

    await schedules.create({
      task: pyngTask.id,
      cron: everyOptionToCronMap[data.every],
      timezone: data.timezone,
      externalId: pyng.id,
      deduplicationKey: `${pyng.id}-pyng`, //this makes it impossible to have two schedules for the same pyng
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating pyng schedule:", error);
    return { success: false, error: "Failed to create pyng schedule" };
  }
}
