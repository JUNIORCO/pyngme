import { schedules } from "@trigger.dev/sdk/v3";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { Resend } from "resend";
import { z } from "zod";
import prisma from "../../prisma/prisma";
import { SYSTEM_PROMPT, USER_PROMPT } from "./prompts";
import scrape from "./scrape";
import stripe from "./stripe";

type PyngTaskOutput = {
  stripeCustomerId: string;
};

export const pyngTask = schedules.task({
  id: "pyng",
  onSuccess: async (payload, output) => {
    console.log("pyngTask onSuccess payload: ", payload);
    console.log("pyngTask onSuccess output: ", output);
    const { stripeCustomerId } = output as PyngTaskOutput;
    await stripe.billing.meterEvents.create({
      event_name: "pyng_run",
      payload: {
        stripe_customer_id: stripeCustomerId,
      },
    });
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
      shouldSendEmail: z.boolean(),
    });
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: USER_PROMPT(
            previousRun.scrape,
            markdown,
            currentPyng.condition,
          ),
        },
      ],
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
        scrape: markdown,
        reasoning: message?.reasoning || "",
        sentEmail: message?.shouldSendEmail || false,
        pyngId,
        clerkUserId: currentPyng.clerkUserId,
      },
    });

    console.log("run: ", run);

    if (!message?.shouldSendEmail) {
      console.log("Condition not met, done.");
      return;
    }

    // if condition is met, send email
    console.log("Condition met, sending email...");
    const resend = new Resend();
    const emailResponse = await resend.emails.send({
      from: "Pyngme <no-reply@trypyngme.com>",
      to: currentPyng.email,
      subject: "Your Pyng has been triggered!",
      html: `
        <div>
    <h1>Hey!</h1>
    <p>Your pyng has been triggered!</p>
    <p>Url: ${currentPyng.url}</p>
    <p>Condition: ${currentPyng.condition}</p>
    <p>Thanks for using Pyngme.</p>
  </div>
      `,
    });

    console.log("emailResponse: ", emailResponse);

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return {
      stripeCustomerId: currentPyng.stripeCustomerId,
    } as PyngTaskOutput;
  },
});
