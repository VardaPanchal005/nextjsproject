import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ShieldIcon, ShieldOffIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { GetCredentialsForUser } from '../../../actions/credentials/getCredentialsForUser'
import { Card } from '@/components/ui/card'
import CreateCredentialDialog from './_components/CreateCredentialDialog'

export default function Credentialspage() {
  return (
    <div className='flex flex-1 flex-col h-full'>
        <div className='flex justify-between'>
        <div className='flex flex-col'>
            <h1 className='text-3xl font-bold'>Credentials</h1>
            <p className='text-muted-foreground'>Manage credentials</p>
        </div>
        <CreateCredentialDialog triggerText="Create your first credential"/></div>
        <div className='h-full py-8 space-y-8'><Alert><ShieldIcon className='h-4 w-4 stroke-primary'/><AlertTitle className='text-primary'>Encryption</AlertTitle><AlertDescription>All information is securely encrypted, ensuring the data remains safe</AlertDescription></Alert>
        <Suspense fallback={<Skeleton className='h-[300px] w-full'/>}></Suspense><UserCredentials/></div></div>
  )
}

async function UserCredentials(){
    const credentials= await GetCredentialsForUser();

    if (!credentials){
        return <div>Something went wrong</div>
    }
    if (credentials.length===0){
       return (<Card className='w-full p-4'>
        <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'><ShieldOffIcon size={40} className='stroke-primary'/>
            </div>
            <div className='flex flex-col gap-1 text-center'>
                <p className='text-bold'>No credentials created yet</p>
                <p className='text-sm text-muted-foreground'>Click the button below to create credentials</p>
            </div>
        </div>
        <CreateCredentialDialog triggerText="Create your first credential"/>
       </Card> 
       );
    }
    return <div>User creds</div>
}
