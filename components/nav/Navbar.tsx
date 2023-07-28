"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {User, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {createClientComponentClient, Session} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useSession} from "@/providers/supabase-provider";

interface AccountFormProps {
    session: Session | null;
}

export default function Navbar({session}: AccountFormProps) {
    const supabase = createClientComponentClient<Database>();
    const user = session?.user;
    const token = session?.provider_token;
    const [spotifyAvatarUrl, setSpotifyAvatarUrl] = useState<string | null>(null);

    async function fetchWebApi(endpoint: string, method: string, body?: any) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        const data = await res.json();

        return data;
    }

    async function getUserProfile() {
        const profileData = await fetchWebApi('v1/me', 'GET');
        setSpotifyAvatarUrl(profileData.images[0].url);

    }

    useEffect(() => {
        if (user && token) {
            getUserProfile();
        }
    }, [user, token]);



    // Function to handle user sign-out
    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
        router.refresh();
    };

    // Create a reference to Next.js router
    const router = useRouter();
    return (
        <nav className=" border-b border-neutral-600 bg-gray-1100 text-stone-100">
            {/* Container */}
            <div className="flex items-center  max-w-screen-3xl  justify-between flex-wrap  mx-auto p-4">
                {/* Logo */}
                <Link href={"/"}>
                    <div className="px-3 ">
                        <h2 className="mb-2 px-4 text-lg font-semibold text-spotify-green tracking-tight">
                            Melodio World 🌍
                        </h2>
                    </div>
                </Link>
                {/* Avatar or Log In button */}
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={spotifyAvatarUrl ?? ""} alt="@shadcn"/>
                                <AvatarFallback className={"text-gray-900"}>
                                    {user?.email?.charAt(0).toUpperCase() ?? "M"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel onClick={() => {
                                // Redirect to the login page
                                router.push("/account");

                            }}>My Account</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2"/>
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut className="w-4 h-4 mr-2"/>
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button  className="bg-spotify-green rounded-2xl text-stone-100" onClick={() => {
                        // Redirect to the login page
                        router.push("/login");

                    }}>Login</Button>
                )}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm px-4 py-2  text-gray-100  md:hidden ">
                <Link className="hover:text-gray-600 font-semibold hover:bg-spotify-green px-4 rounded" href="/explore">
                    Explore
                </Link>
                <Link className="hover:text-gray-600 font-semibold hover:bg-spotify-green px-4 rounded" href="/favorites">
               Favorites
                </Link>
                <Link className="hover:text-gray-600 font-semibold hover:bg-spotify-green px-4 rounded" href="/recommended">
                    Recommended
                </Link>
            </div>
        </nav>
    );
};
