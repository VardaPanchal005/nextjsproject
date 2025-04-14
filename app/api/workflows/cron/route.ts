import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const now = new Date();

  const workflows = await prisma.workflow.findMany({
    select: { id: true },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });

  await Promise.all(workflows.map((workflow) => triggerWorkflow(workflow.id)));

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}

async function triggerWorkflow(workflowId: string) {
  const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);

  try {
    const res = await fetch(triggerApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET!}`,
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(
        `Failed to trigger workflow ${workflowId}: ${res.status} ${res.statusText}`
      );
    }
  } catch (error: any) {
    console.error(
      "Error triggering workflow with id",
      workflowId,
      ":error->",
      error.message
    );
  }
}
