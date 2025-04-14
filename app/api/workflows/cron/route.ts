import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";


export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  try {
    const now = new Date();
    const workflows = await prisma.workflow.findMany({
      select: { id: true },
      where: {
        status: WorkflowStatus.PUBLISHED,
        cron: { not: null },
        nextRunAt: { lte: now }
      }
    });

    for (const workflow of workflows) {
      triggerWorkflow(workflow.id);
    }

    return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
  } catch (error) {
    console.error("Error in cron job:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function triggerWorkflow(workflowId: string) {
  const apiPath = `api/workflows/execute?workflowId=${workflowId}`;
  
  const fetchUrl = process.env.NODE_ENV === 'development' 
    ? getAppUrl(apiPath)
    : apiPath;
  
  fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET || ''}`
    },
    cache: "no-store",
  }).catch((error) => {
    console.error(`Error triggering workflow ${workflowId}:`, error.message);
  });
}
