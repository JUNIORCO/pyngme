import { RunStatus } from "@prisma/client";
import { schedules } from "@trigger.dev/sdk/v3";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resend } from "resend";
import { z } from "zod";
import prisma from "../../prisma/prisma";
import clerk from "./clerk";
import { MAX_FREE_RUNS_PER_MONTH } from "./constants";
import { SYSTEM_PROMPT, USER_PROMPT } from "./prompts";
import scrape from "./scrape";
import stripe from "./stripe";

export const pyngTask = schedules.task({
  id: "pyng",
  onSuccess: async (payload, output: { runId: string }) => {
    await prisma.run.update({
      where: {
        id: output.runId,
      },
      data: {
        status: RunStatus.Success,
      },
    });

    const pyngId = payload.externalId;
    if (!pyngId) {
      throw new Error("externalId (which is the pyngId) is required");
    }

    // current pyng
    const currentPyng = await prisma.pyng.findUniqueOrThrow({
      where: {
        id: pyngId,
      },
    });

    const user = await clerk.users.getUser(currentPyng.clerkUserId);
    const runCount = user.publicMetadata.runCount as number;

    if (runCount < MAX_FREE_RUNS_PER_MONTH) {
      console.log("Updating run count...");
      const updatedUser = await clerk.users.updateUserMetadata(
        currentPyng.clerkUserId,
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
          stripe_customer_id: currentPyng.stripeCustomerId,
        },
      });
      console.log("Billing meter event created", meterEvent);
    }
  },
  run: async (payload) => {
    const pyngId = payload.externalId;
    if (!pyngId) {
      throw new Error("externalId (which is the pyngId) is required");
    }

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

    // previous run
    const previousRun = await prisma.run.findFirstOrThrow({
      where: {
        pyngId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // scrape
    const markdown = await scrape(currentPyng.url);

    const openai = new OpenAI();
    const ShouldSendEmailReasoning = z.object({
      reasoning: z.string(),
      reflection: z.string(),
      shouldSendEmail: z.boolean(),
    });

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      {
        role: "user" as const,
        content: USER_PROMPT(
          previousRun.scrape,
          markdown,
          currentPyng.condition,
        ),
      },
    ];

    console.log("messages: ", messages);

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages,
      response_format: zodResponseFormat(
        ShouldSendEmailReasoning,
        "should_send_email_reasoning",
      ),
    });
    const message = completion.choices[0].message.parsed;

    console.log("openai message: ", message);

    // save to db
    const run = await prisma.run.create({
      data: {
        status: RunStatus.Pending,
        scrape: markdown,
        reasoning: `Reasoning:\n${message?.reasoning}\n\nReflection:\n${message?.reflection}`,
        sentEmail: message?.shouldSendEmail || false,
        pyngId,
        clerkUserId: currentPyng.clerkUserId,
      },
    });

    console.log("run: ", run);

    if (!message?.shouldSendEmail) {
      console.log("Condition not met, done.");
      return {
        runId: run.id,
      };
    }

    // if condition is met, send email
    console.log("Condition met, sending email...");
    const resend = new Resend();
    const emailResponse = await resend.emails.send({
      from: "Pyngme <no-reply@trypyngme.com>",
      to: currentPyng.email,
      subject: "A Pyng has been triggered",
      html: `
        <div>
    <h2>Hello,</h2>
    <p>The Pyng "${currentPyng.name}" has been triggered.</p>
    <p>See it <a href="https://trypyngme.com/pyngs">here</a>.</p>
    <p>Thanks for using Pyngme.</p>
  </div>
      `,
    });

    console.log("emailResponse: ", emailResponse);

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return {
      runId: run.id,
    };
  },
});
