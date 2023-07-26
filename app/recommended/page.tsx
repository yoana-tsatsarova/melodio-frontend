import {createClientComponentClient, createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import Recommended from "@/app/recommended/recommended";


export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <Recommended session={session} />
        </>
    )

}
