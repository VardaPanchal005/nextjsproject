import { TaskParamType, TaskType } from "@/types/task";       
import { WorkflowTask } from "@/types/workflow";
import {ArrowUpIcon, DatabaseIcon, FileJson2Icon} from "lucide-react";

export const ScrollElementTask={
       type: TaskType.SCROLL_ELEMENT,
       label:"Scroll to Element", 
       icon:(props)=>(
        <ArrowUpIcon className="stroke-indigo-500"{...props}/>   
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
                name:"Selector",
                type:TaskParamType.STRING,
                required:true,
              },
    
       ] as const,
       outputs:[
        {
            name:"Webpage",
            type:TaskParamType.BROWSER_INSTANCE,

        },
         
    ] as const 
} satisfies WorkflowTask