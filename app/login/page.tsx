import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {Database} from "@/types/supabase";
import LoginForm from "@/app/login/Login";


export default async function Login() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <div className="grid w-full h-screen grid-cols-2">
            <LoginForm session={session} />
            <div className="border-l-2 bg-gradient-to-r from-emerald-300 to-emerald-700 border-emerald-500" />
                <h1>     Melodio World 🌍</h1>
        </div>

        </>
    )
}
