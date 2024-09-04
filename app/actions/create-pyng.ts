"use server";

import type { IFormInput } from "@/components/create-pyng/types";
import { firstRun } from "@/trigger/first-run";
import { EveryOption } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";
import prisma from "../../prisma/prisma";
import { pyngTask } from "../trigger/pyng";

export async function createPyng(data: IFormInput) {
  try {
    console.log("Creating pyng...", data);
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

    console.log("Pyng created:", pyng);

    const everyOptionToCronMap: Record<EveryOption, string> = {
      [EveryOption.FifteenMinutes]: "*/15 * * * *",
      [EveryOption.Hour]: "0 * * * *",
      [EveryOption.FourHours]: "0 */4 * * *",
      [EveryOption.Day]: "0 0 * * *",
    };

    const schedulePayload = {
      task: pyngTask.id,
      cron: everyOptionToCronMap[data.every],
      timezone: data.timezone,
      externalId: pyng.id,
      deduplicationKey: `${pyng.id}-pyng`, //this makes it impossible to have two schedules for the same pyng
    };

    // trigger the first run
    await firstRun.trigger({
      pyngId: pyng.id,
      schedulePayload,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating pyng schedule:", error);
    return {
      success: false,
      error: "Failed to create pyng schedule",
    };
  }
}
