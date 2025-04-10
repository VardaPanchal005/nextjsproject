import { TaskParamType, TaskType } from "@/types/task";       
import { WorkflowTask } from "@/types/workflow";
import { SendIcon, TextIcon} from "lucide-react";

export const DeliverViaWebhookTask={
       type: TaskType.DELIVER_VIA_WEBHOOK,
       label:"Deliver via Webhook",
       icon:(props)=>(
        <SendIcon className="stroke-orange-500"{...props}/>
       ),
       isEntryPoint:false,
       credits:1,
       inputs:[
              {
                     name:"Target URL",
                     type:TaskParamType.STRING,
                     required:true, 
              }, 
              {
                name:"Body",
                type:TaskParamType.STRING,
                required:true,
              }
    
       ] as const,
       outputs:[   
    ] as const 
} satisfies WorkflowTask