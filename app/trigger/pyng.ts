import { schedules } from "@trigger.dev/sdk/v3";
import { Resend } from "resend";
import prisma from "../../prisma/prisma";
import { PyngEmailTemplate } from "./email-template";

export const pyngTask = schedules.task({
  id: "pyng",
  run: async (payload) => {
    const pyngId = payload.externalId;
    if (!pyngId) {
      throw new Error("externalId (which is the pyngId) is required");
    }

    const { email, url, condition } = await prisma.pyng.findUniqueOrThrow({
      where: {
        id: pyngId,
      },
    });

    // check if condition is met
    const conditionMet = false;

    if (!conditionMet) {
      console.log("Condition not met, done.");
      return;
    }

    // if condition is met, send email
    console.log("Condition met, sending email...");
    const resend = new Resend();
    const emailResponse = await resend.emails.send({
      from: "Pyngme <sami.juniorco@gmail.com>",
      to: email,
      subject: "Your Pyng has been triggered!",
      react: PyngEmailTemplate({ url, condition }),
    });

    console.log("emailResponse: ", emailResponse);

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }
  },
});
