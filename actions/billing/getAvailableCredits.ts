 "use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

 export async function GetAvailableCredits(){
    const {userId} = await auth();
    if (!userId){
        throw new Error("unauthenticated");
    }
    const balance=await prisma.userBalance.findUnique({
        where:{userId},
    });
    if (!balance) return 10000;
    return balance.credits;
    
 }