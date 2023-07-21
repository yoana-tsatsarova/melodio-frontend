import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Marquee from "react-fast-marquee";

export default async function Index() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()
    console.log(user)

    return (
        <div className="w-full flex flex-col items-center min-h-screen justify-center ">

           <h1 className={"text-7xl text-center font-bold text-slate-50"}>Melodio World of songs 🌍</h1>
            <Marquee className={"text-7xl text-center font-bold text-slate-50"}>
            JAVA PUFFS - Togrul - Yoana - Carolina - Ryan
            </Marquee>

        </div>
    )
}
