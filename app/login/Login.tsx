import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function Login() {


    const handleSignIn = async (formData: FormData) => {
        'use server'


        const supabase = createServerActionClient({ cookies })
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'spotify',
        })

        revalidatePath('/')
    }

    const handleSignOut = async () => {
        'use server'
        const supabase = createServerActionClient({ cookies })
        await supabase.auth.signOut()
        revalidatePath('/')
    }

    return (
        <form action={handleSignIn}>

            <button formAction={handleSignIn}>Sign in</button>
            <button formAction={handleSignOut}>Sign out</button>
        </form>
    )
}
