'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {supabase} from "@supabase/auth-ui-shared";
import {Database} from "@/types/supabase";
import {Button} from "@/components/ui/button";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()

    const signInWithSpotify = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "spotify",
            options: {
                scopes:
                    "user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private user-read-playback-position user-top-read",
                grant_type: "authorization_code",
            },
        });
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>
            <Button onClick={signInWithSpotify}>Sign in</Button>
            <Button onClick={handleSignOut}>Sign out</Button>
        </>
    )
}