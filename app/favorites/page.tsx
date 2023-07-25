import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import FavoritesPage from "@/app/favorites/favorites-page";


export default async function Page() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <>
            <FavoritesPage session={session} />
        </>
    )

}
