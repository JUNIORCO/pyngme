"use server";

import type { IFormInput } from "@/components/create-pyng/types";
import Routes from "@/routes";
import { firstRun } from "@/trigger/first-run";
import { pyngTask } from "@/trigger/pyng";
import { EveryOption } from "@prisma/client";
import { runs } from "@trigger.dev/sdk/v3";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import prisma from "../../prisma/prisma";

export async function createPyng(data: IFormInput) {
  try {
    console.log("Creating pyng...", data);

    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are part of a service called Pyngme. The company allows users to setup "pyngs" in natural language, and we must pyng them when the condition has been met.

For example, a user can set up "email <> when <a new blog post is release> for <somewebsite.com>", and if a new blog post has been released, we send them an email.`,
        },
        {
          role: "user",
          content: `Generate a short name for this Pyng:\n\nWhen: ${data.when}\nFor: ${data.for}\n\nDo not format the name. Just return the name without quotation marks. If you are going to add "alert" to the name, instead add "Pyng"`,
        },
      ],
      model: "gpt-4o-mini",
    });
    const name = completion.choices[0].message.content || "Untitled Pyng";

    const pyng = await prisma.pyng.create({
      data: {
        name,
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
    const { id: runId } = await firstRun.trigger({
      pyngId: pyng.id,
      schedulePayload,
    });

    const maxAttempts = 10;
    const pollInterval = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const result = await runs.retrieve(runId);
      if (result.isSuccess) {
        console.log("First run completed:", result);
        revalidatePath(Routes.pyngs);
        return { success: true };
      }
      if (result.isFailed) {
        console.log("First run failed:", result);
        return { success: false };
      }

      if (attempt < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      }
    }

    console.log("First run did not complete within the expected time");
    return { success: false };
  } catch (error) {
    console.error("Error creating pyng schedule:", error);
    return {
      success: false,
      error: "Failed to create pyng schedule",
    };
  }
}
