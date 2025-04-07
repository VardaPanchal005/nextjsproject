"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CronExpressionParser } from 'cron-parser';


export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("unauthenticated");
  }
  
  try {
    const interval = CronExpressionParser.parse(cron);
     await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      } 
    });
  } catch (error: any) {
    console.log(error, "ertrr")
    console.error(error.message);
    throw new Error("invalid cron expression");
  }
  revalidatePath("/workflows")
}