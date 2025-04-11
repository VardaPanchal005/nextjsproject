import { TaskParamType, TaskType } from "@/types/task";       
import { WorkflowTask } from "@/types/workflow";
import {FileJson2Icon} from "lucide-react";

export const ReadPropertyFromJsonTask={
       type: TaskType.READ_PROPERTY_FROM_JSON,
       label:"Read property from JSON",
       icon:(props)=>(
        <FileJson2Icon className="stroke-lime-500"{...props}/>   
       ),
       isEntryPoint:false,
       credits:4,
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
              }
    
       ] as const,
       outputs:[
        {
            name:"Property value",
            type:TaskParamType.STRING,

        },
         
    ] as const 
} satisfies WorkflowTask