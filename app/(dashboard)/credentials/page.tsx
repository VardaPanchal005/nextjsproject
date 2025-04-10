import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ShieldIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { GetCredentialsForUser } from './getCredentialsForUser'

export default function Credentialspage() {
  return (
    <div className='flex flex-1 flex-col h-full'>
        <div className='flex justify-between'>
        <div className='flex flex-col'>
            <h1 className='text-3xl font-bold'>Credentials</h1>
            <p className='text-muted-foreground'>Manage credentials</p>
        </div></div>
        <div className='h-full py-8 space-y-8'><Alert><ShieldIcon className='h-4 w-4 stroke-primary'/><AlertTitle className='text-primary'>Encryption</AlertTitle><AlertDescription>All information is securely encrypted, ensuring the data remains safe</AlertDescription></Alert>
        <Suspense fallback={<Skeleton className='h-[300px] w-full'/>}></Suspense><UserCredentials/></div></div>
  )
}

async function UserCredentials(){
    const credentials=GetCredentialsForUser();

    if (!credentials){
        return <div>Something went wrong</div>
    }
    return <div>User creds</div>
}
