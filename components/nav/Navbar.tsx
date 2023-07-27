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

// Define types for profile data
type ProfileData = {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
};

interface AccountFormProps {
    session: Session | null;
}


const Navbar = ({session}: { session: Session | null }) => {
    // Create a supabase client
    const supabase = createClientComponentClient<Database>();

    // State to manage user data and loading state
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    const user = session?.user;

    // Function to fetch and update profile data
    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const {data} = await supabase
                .from('profiles')
                .select(`full_name, username, avatar_url`)
                .eq('id', user?.id)
                .single();

            if (data) {
                setProfileData(data);
            }

            console.log(session)
            console.log("Success")
        } catch (error) {
            console.log(session)
            alert('Error loading user data!');
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user, getProfile]);

    // Function to handle user sign-out
    const signOut = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
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
                                <AvatarImage src={user?.app_metadata.avatar_url ?? ""} alt="@shadcn"/>
                                <AvatarFallback className={"text-gray-900"}>
                                    {profileData?.full_name?.charAt(0).toUpperCase() ?? "M"}
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
                    <Button size={"lg"} className="bg-spotify-green rounded-2xl text-stone-200" onClick={() => {
                        // Redirect to the login page
                        router.push("/login");
                    }}>Login</Button>
                )}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm px-4 py-2 block text-gray-100  md:hidden ">
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

export default Navbar;
