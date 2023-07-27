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
            <div className="grid w-full h-screen grid-cols-1 md:grid-cols-2">
            <LoginForm session={session} />

            <div className="border-l-2 bg-gradient-to-r from-emerald-300 to-emerald-700 border-emerald-500" >
                <div className="flex flex-col  items-center justify-center min-h-screen py-2 px-4 sm:px-0">
                    <div className="flex items-center justify-center w-full h-full">
                <h1 className={"text-6xl  font-bold"}>     Melodio World 🌍</h1>
        </div>
            </div>
            </div>
            </div>
        </>
    )
}
