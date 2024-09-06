import type { WebhookEvent } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Webhook } from "svix";
import onUserCreate from "./on-user-create";
import onUserDelete from "./on-user-delete";

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") as string,
    "svix-timestamp": headerPayload.get("svix-timestamp") as string,
    "svix-signature": headerPayload.get("svix-signature") as string,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  try {
    console.log("Inside Clerk Webhook");
    const payload = await validateRequest(request);
    console.log("Payload type: ", payload.type);

    switch (payload.type) {
      case "user.created": {
        await onUserCreate(payload.data);
        break;
      }
      case "user.deleted": {
        const userId = payload.data.id;
        await onUserDelete(userId);
        break;
      }
    }

    revalidatePath("/");

    return Response.json({ message: "Received" });
  } catch (e) {
    console.error(e);
    return Response.error();
  }
}
