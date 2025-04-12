import { GetPeriods } from '@/actions/analytics/getPeriods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import { Period } from '@/types/analytics';
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import StatsCard from './_components/StatsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
import ExecutionStatusChart from './_components/ExecutionStatusChart';
import { getCreditsUsageInPeriod } from '@/actions/analytics/getCreditUsageInperiod';
import CreditsUsageChart from '../billing/_components/CreditsUsageChart';

function Homepage({searchParams,}:{searchParams:{month?:string;year?:string}}) {
    const currentDate=new Date();
     const {month,year}=searchParams;
     const period:Period={
        month:month?parseInt(month):currentDate.getMonth(),
        year:year?parseInt(year):currentDate.getFullYear(),
     }
    return(
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between'>
            <h1 className='text-3xl font-bold'>Home
                </h1><Suspense fallback={<Skeleton className='w-[180px] h-[40px]'/>}>
            <PeriodSelectorWrapper selectedPeriod={period}/></Suspense></div>
            <div className='h-full py-6 flex flex-col gap-4'><Suspense fallback={<StatsCardSkeleton/>}>
            <StatsCards selectedPeriod={period}/></Suspense>
            <Suspense fallback={<Skeleton className='w-full h-[300px]'/>}>
            <StatsExecutionStatus selectedPeriod={period}/>
            </Suspense>
            <Suspense fallback={<Skeleton className='w-full h-[300px]'/>}>
            <CreditsUsageInPeriod selectedPeriod={period}/>
            </Suspense>
            </div></div>
    )
}

async function PeriodSelectorWrapper({selectedPeriod}:{selectedPeriod:Period}){
    const periods=await GetPeriods();
    return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods}/>
}

async function StatsCards({selectedPeriod}:{selectedPeriod:Period}){
    const data=await GetStatsCardsValues(selectedPeriod);
    return <div className='grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]'>
        <StatsCard title="Workflow Executions" value={data.workflowExecutions} icon={CirclePlayIcon}></StatsCard>
        <StatsCard title="Phase Executions" value={data.phaseExecutions} icon={WaypointsIcon}></StatsCard>
        <StatsCard title="Credits Executions" value={data.creditsConsumed} icon={CoinsIcon}></StatsCard>
        
        
        </div>
} 

function StatsCardSkeleton(){
    return (
        <div className='grid gap-3 lg:gap-8 lg:grid-cols-3'>
            {[1,2,3].map((i) =>(
                <Skeleton key={i} className='w-full min-h-[120px]'/>
            ))}
        </div>
    )
}

async function StatsExecutionStatus({selectedPeriod}:{selectedPeriod:Period}){ 
    const data=await getWorkflowExecutionStats 
    (selectedPeriod);
    return (
        <ExecutionStatusChart data={data}/>
    )
}

async function CreditsUsageInPeriod({selectedPeriod}:{selectedPeriod:Period}){ 
    const data=await getCreditsUsageInPeriod
    (selectedPeriod);
    return (
       <CreditsUsageChart data={data} title="Daily credits spent" description="Daily credit consumed in selected period"/>
    )
}

export default Homepage;