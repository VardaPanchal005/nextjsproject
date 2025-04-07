import { AppNode } from "@/types/appNode";
import { TaskRegistry } from "./task/registry";

export async function CalculateWorkflowCost(nodes:AppNode[]){
    return nodes.reduce((acc,node)=>{
        return acc+TaskRegistry[node.data.type].credits;
    },0);
    
}