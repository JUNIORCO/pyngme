import { schedules, task } from "@trigger.dev/sdk/v3";
import prisma from "../../prisma/prisma";
import scrape from "./scrape";

export const firstRun = task({
  id: "first-run",
  onSuccess: async (payload, output, { ctx }) => {
    console.log("Creating schedule...");

    const schedule = await schedules.create(output.schedulePayload);

    console.log("Schedule created:", schedule);

    console.log("Updating pyng with schedule id...");
    await prisma.pyng.update({
      where: {
        id: output.schedulePayload.externalId,
      },
      data: {
        triggerScheduleId: schedule.id,
      },
    });
  },
  run: async (payload: {
    pyngId: string;
    schedulePayload: {
      task: string;
      cron: string;
      timezone: string;
      externalId: string;
      deduplicationKey: string;
    };
  }) => {
    const { pyngId, schedulePayload } = payload;
    // current pyng
    const currentPyng = await prisma.pyng.findUniqueOrThrow({
      where: {
        id: pyngId,
      },
    });

    // scrape
    const markdown = await scrape(currentPyng.url);

    // create run
    await prisma.run.create({
      data: {
        pyngId,
        scrape: markdown,
        reasoning: "First run.",
        sentEmail: false,
        userId: currentPyng.userId,
      },
    });

    return { schedulePayload };
  },
});
