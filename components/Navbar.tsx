import React from 'react'
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

const Navbar = async () => {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 border-b-slate-100 border-b ">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground  ">
                    <div/>
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                Hey, {user.id}!
                                <LogoutButton/>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="py-2 px-4 rounded-md no-underline text-slate-50  text-xl font-medium hover:bg-btn-background-hover"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
