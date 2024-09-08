import { RunStatus } from "@prisma/client";
import { schedules, task } from "@trigger.dev/sdk/v3";
import prisma from "../../prisma/prisma";
import clerk from "./clerk";
import { MAX_FREE_RUNS_PER_MONTH } from "./constants";
import scrape from "./scrape";
import stripe from "./stripe";

export const firstRun = task({
  id: "first-run",
  onSuccess: async (_, output) => {
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

    console.log("Creating billing meter event...");

    const user = await clerk.users.getUser(output.clerkUserId);
    const runCount = user.publicMetadata.runCount as number;

    if (runCount < MAX_FREE_RUNS_PER_MONTH) {
      console.log("Updating run count...");
      const updatedUser = await clerk.users.updateUserMetadata(
        output.clerkUserId,
        {
          publicMetadata: {
            runCount: runCount + 1,
          },
        },
      );
      console.log("Run count updated", updatedUser.publicMetadata.runCount);
    } else {
      console.log("Creating billing meter event...");
      const meterEvent = await stripe.billing.meterEvents.create({
        event_name: "pyng_run",
        payload: {
          stripe_customer_id: output.stripeCustomerId,
        },
      });
      console.log("Billing meter event created", meterEvent);
    }

    await prisma.run.update({
      where: {
        id: output.runId,
      },
      data: {
        status: RunStatus.Success,
      },
    });
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onFailure: async (payload, error: any) => {
    console.error("Failed to create first run", error);

    const existingRun = await prisma.run.findFirst({
      where: {
        pyngId: payload.pyngId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (existingRun) {
      // Update the existing run
      await prisma.run.update({
        where: { id: existingRun.id },
        data: {
          status: RunStatus.Failure,
          error: error.message,
        },
      });
    } else {
      // current pyng
      const currentPyng = await prisma.pyng.findUniqueOrThrow({
        where: {
          id: payload.pyngId,
        },
      });

      // Create a new run
      await prisma.run.create({
        data: {
          pyngId: payload.pyngId,
          status: RunStatus.Failure,
          error: error.message,
          scrape: "",
          reasoning: "Failed during first run.",
          sentEmail: false,
          clerkUserId: currentPyng.clerkUserId,
        },
      });
    }
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

    console.log("Running first run for pyng", {
      where: {
        id: pyngId,
      },
    });

    // current pyng
    const currentPyng = await prisma.pyng.findUniqueOrThrow({
      where: {
        id: pyngId,
      },
    });

    const clerkUserId = currentPyng.clerkUserId;
    const clerkUser = await clerk.users.getUser(clerkUserId);
    const stripeSetupSucceeded = clerkUser.publicMetadata
      .stripeSetupSucceeded as boolean | undefined;
    const runCount = clerkUser.publicMetadata.runCount as number;
    if (!stripeSetupSucceeded && runCount >= MAX_FREE_RUNS_PER_MONTH) {
      throw new Error("User has reached the maximum number of free runs.");
    }

    // scrape
    const markdown = await scrape(currentPyng.url);

    // create run
    const run = await prisma.run.create({
      data: {
        pyngId,
        scrape: markdown,
        reasoning: "First run.",
        sentEmail: false,
        clerkUserId: currentPyng.clerkUserId,
        status: RunStatus.Pending,
      },
    });

    return {
      schedulePayload,
      stripeCustomerId: currentPyng.stripeCustomerId,
      clerkUserId,
      runId: run.id,
    };
  },
});
