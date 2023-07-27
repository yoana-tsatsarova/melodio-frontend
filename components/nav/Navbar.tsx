"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

// Define types for profile data
type ProfileData = {
    full_name: string | null;
    username: string | null;
    website: string | null;
    avatar_url: string | null;
};

const Navbar = ({ session }: { session: Session | null }) => {
    // Create a supabase client
    const supabase = createClientComponentClient<Database>();

    // State to manage user data and loading state
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const router = useRouter();

    const user = session?.user;

    // Function to fetch and update profile data
    const getProfile = useCallback(async () => {
        try {
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

    return (
        <nav className="bg-stone-200 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/">
                    <a className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Melodio World 🌍</span>
                    </a>
                </Link>
                {/* User Avatar/Profile or Log In button */}
                <div className="flex items-center md:order-2">
                    {session ? (
                        <div>
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={profileData?.avatar_url ?? ""} alt="user photo" />
                            </button>
                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{profileData?.full_name}</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{profileData?.username}</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            <User className="w-4 h-4 mr-2" />
                                            <span>Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            <span>Log out</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                router.push("/login");
                            }}
                            className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
