"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExecutionWithPhases(executionId:string){
    const {userId}= await auth();

    if (!userId){
        throw new Error("unauthenticated");
    }
    return prisma.workflowExecution.findUnique({
        where:{
            id:executionId,
            userId,
        },
        include:{
            phases:{
                orderBy:{
                    number:"asc",
                }
            }
        }
    })
}