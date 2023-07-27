"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {createClientComponentClient, Session} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define types for profile data
type ProfileData = {
    full_name: string | null;
    username: string | null;
    website: string | null;
    avatar_url: string | null;
};

interface AccountFormProps {
    session: Session | null;
}


const Navbar = ({ session }: { session: Session | null }) =>{
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

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single() as { data: ProfileData; error: Error | null; status: number };

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setProfileData(data);
            }
        } catch (error) {
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
        <nav className="w-full border-b border-neutral-100 bg-gray-1100 text-stone-100">
            {/* Container */}
            <div className="flex items-center justify-around w-full py-6 mx-auto max-w-7xl">
                {/* Logo */}
                <div className="px-3 py-4">
                    <h2 className="mb-2 px-4 text-lg font-semibold text-spotify-green tracking-tight">
                        Melodio World 🌍
                    </h2>
                </div>
                {/* Avatar or Log In button */}
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={profileData?.avatar_url ?? ""} alt="@shadcn" />
                                <AvatarFallback className={"text-gray-900"}>
                                    {profileData?.full_name?.charAt(0).toUpperCase() ?? "M"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <button
                        onClick={() => {
                            // Redirect to the login page
                            router.push("/login");
                        }}
                        className="px-4 py-2 font-medium text-white bg-spotify-green rounded-md"
                    >
                        Log In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
