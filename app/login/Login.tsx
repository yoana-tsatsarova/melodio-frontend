'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {Database} from "@/types/supabase";
import {Button} from "@/components/ui/button";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()



    async function signInWithSpotify() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'spotify',
        })
        router.refresh()
    }


    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>

            <Button onClick={signInWithSpotify}>Sign in</Button>
        </>
    )
}
