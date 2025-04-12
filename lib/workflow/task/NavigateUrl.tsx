import { TaskParamType, TaskType } from "@/types/task";       
import { WorkflowTask } from "@/types/workflow";
import {DatabaseIcon, FileJson2Icon, Link2Icon} from "lucide-react";

export const NavigateUrlTask={
       type: TaskType.NAVIGATE_URL,
       label:"Navigate URL", 
       icon:(props)=>(
        <Link2Icon className="stroke-cyan-500"{...props}/>   
       ),
       isEntryPoint:false,
       credits:2,
       inputs:[               
              {
                     name:"Web Page",
                     type:TaskParamType.BROWSER_INSTANCE,
                     required:true, 
              }, 
              {
                name:"URL",
                type:TaskParamType.STRING,
                required:true,
              },
    
       ] as const,
       outputs:[
        {
            name:"Web page",
            type:TaskParamType.BROWSER_INSTANCE,

        },
         
    ] as const 
} satisfies WorkflowTask