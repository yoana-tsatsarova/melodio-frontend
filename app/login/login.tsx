import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabase";
import {Button} from "@/components/ui/button";
import Image from 'next/image';
import { useRouter } from 'next/navigation'


export default function Login() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const signInWithSpotify = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "spotify",
            options: {
                redirectTo: "/account",
                scopes:
                    "user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-private user-read-playback-position user-top-read",
            },
        });
        router.refresh();
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 sm:px-0">
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-full max-w-lg">
                    <div>
                        <h1 className="text-4xl font-bold">Login</h1>
                        <p className="mt-2 text-neutral-600">
                            Welcome to the{" "}
                            <span className="font-semibold text-neutral-800">
                                Melodio World of Songs
                            </span>{" "}
                            Please login your account by email or the Spotify account.
                        </p>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <Button
                            className=" w-full md:w-1/2 gap-2 mt-4 bg-gray-950 hover:bg-gray-600 text-stone-50 font-semibold rounded shadow shadow-spotify-green "
                            onClick={signInWithSpotify}
                            variant={"outline"}
                        >
                            Sign in
                            <Image
                                priority
                                src="public/images/spotify-icon.svg"
                                height={32}
                                width={32}
                                alt="Log in with spotify"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
