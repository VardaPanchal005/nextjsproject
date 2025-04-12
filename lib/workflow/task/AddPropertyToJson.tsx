import { TaskParamType, TaskType } from "@/types/task";       
import { WorkflowTask } from "@/types/workflow";
import {DatabaseIcon, FileJson2Icon} from "lucide-react";

export const AddPropertyToJsonTask={
       type: TaskType.ADD_PROPERTY_TO_JSON,
       label:"Add property to JSON", 
       icon:(props)=>(
        <DatabaseIcon className="stroke-indigo-500"{...props}/>   
       ),
       isEntryPoint:false,
       credits:1,
       inputs:[               
              {
                     name:"JSON",
                     type:TaskParamType.STRING,
                     required:true, 
              }, 
              {
                name:"Property name",
                type:TaskParamType.STRING,
                required:true,
              },
              {
                name:"Property value",
                type:TaskParamType.STRING,
                required:true,
              }
    
       ] as const,
       outputs:[
        {
            name:"Update JSON",
            type:TaskParamType.STRING,

        },
         
    ] as const 
} satisfies WorkflowTask