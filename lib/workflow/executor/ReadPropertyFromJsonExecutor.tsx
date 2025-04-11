import {ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJSONExecutor(environment:ExecutionEnvironment<typeof ReadPropertyFromJsonTask>):Promise<boolean>{
    try {
        const jsonData=environment.getInput("JSON");
        if (!jsonData){
            environment.log.error("input->JSON not defined");
        }  
        const propertyName=environment.getInput("Property name");
        if (!propertyName){
            environment.log.error("input->Property name not defined");
        }            
        const json=JSON.parse(jsonData);
        const propertyValue=json(propertyName);
        if (propertyValue===undefined){
            environment.log.error("property not found")
        }
        environment.setOutput("Property value",propertyValue)
        return true;
    }
   catch(error:any){
       environment.log.error(error.message);
       return false;
   }
}