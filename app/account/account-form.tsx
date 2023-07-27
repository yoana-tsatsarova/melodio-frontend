"use client";
import { useCallback, useEffect, useState } from 'react';
import { Database } from '../database.types';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";
import {SpotifyProfileType} from "@/types/types";

interface AccountFormProps {
    session: Session | null;
}

export default function AccountForm({ session }: AccountFormProps) {
    const supabase = createClientComponentClient<Database>();
    const user = session?.user;
    const token = session?.provider_token;
    const [spotifyProfile, setSpotifyProfile] = useState<SpotifyProfileType | null>(null);

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
        return await fetchWebApi('v1/me', 'GET') as SpotifyProfileType;
    }

    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getUserProfile();
            setSpotifyProfile(userProfile);
        };

        fetchData();
    }, []);

    return (
        <div className='container mx-auto flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-300 p-8'>
            <img
                src={spotifyProfile?.images[1]?.url ?? ""}
                alt="Spotify avatar"
                className="w-24 h-24 rounded-full"
            />
            <h2 className='w-1/4 text-center text-lg font-medium'>
                Hello, {spotifyProfile?.display_name}!
            </h2>
            <p className='text-center text-lg font-medium'>
                Spotify ID: {spotifyProfile?.id}
            </p>
            <p className='text-center text-lg font-medium'>
                Email: {user?.email}
            </p>

            <form action="/auth/signout" method="post">
                <Button
                    className="w-full rounded bg-red-500 py-2 text-white"
                    type="submit"
                >
                    Sign out
                </Button>
            </form>
        </div>
    );
}
