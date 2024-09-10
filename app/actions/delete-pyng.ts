"use server";

import Routes from "@/routes";
import { schedules } from "@trigger.dev/sdk/v3";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/prisma";

export async function deletePyng(pyngId: string) {
  try {
    const dbPyng = await prisma.pyng.findUniqueOrThrow({
      where: {
        id: pyngId,
      },
    });

    const scheduleId = dbPyng.triggerScheduleId;
    if (scheduleId) {
      const deletedSchedule = await schedules.del(scheduleId);
      console.log("Deleted schedule: ", deletedSchedule);
    }

    await prisma.pyng.delete({
      where: {
        id: pyngId,
      },
    });

    revalidatePath(Routes.pyngs);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting pyng: ", error);
    return {
      success: false,
    };
  }
}
