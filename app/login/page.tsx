import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {Database} from "@/types/supabase";
import LoginForm from "@/app/login/Login";


export default async function Login() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return <LoginForm session={session} />
}
