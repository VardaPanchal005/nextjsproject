import { cn } from '@/lib/utils';
import { WorkflowExecutionStatus } from '@/types/workflow'
import React from 'react'

const indicatorColors:Record<WorkflowExecutionStatus,string>={
    PENDING:"bg-slate-400",
    RUNNING:"ng-yellow-400",
    FAILED:"bg-red-400",
    COMPLETED:"bg-emerald-600"
}

export default function ExecutionStatusIndicator({status,}:{status:WorkflowExecutionStatus; }) {
  return (
    <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])}/>
  )
} 
