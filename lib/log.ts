import { log,LogCollector, LogFunction, LogLevel, Loglevels } from "@/types/log";

export function createLogCollector():LogCollector {
    const logs:log[]=[];
    const getAll=()=>logs;

    const logFunctions={} as Record<LogLevel,LogFunction>;
    Loglevels.forEach(level=>logFunctions[level]=(message:string)=>{
        logs.push({message,level,timestamp: new Date()})
    })
    return {
        getAll,
       ...logFunctions, 
    }
 
}