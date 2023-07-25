"use client";
import { useCallback, useEffect, useState } from 'react';
import Avatar from './avatar';
import { Database } from '../database.types';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";

import TopTracks from '@/components/TopTracks';
import SpotifyProfile from "@/components/SpotifyProfile";
import {SpotifyProfileType, SpotifyTrack} from "@/types/types";

interface AccountFormProps {
    session: Session | null;
}

export default function AccountForm({ session }: AccountFormProps) {
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const user = session?.user;
    const token = session?.provider_token;
    const [spotifyProfile, setSpotifyProfile] = useState<SpotifyProfileType | null>(null);
    const [topTracks, setTopTracks] = useState<SpotifyTrack[] | null>(null);

    async function fetchWebApi(endpoint: string, method: string, body?: any) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        const data = await res.json(); // read once and store it
        console.log(`Response Status: ${res.status}`);
        console.log(`Response Data:`, data);

        return data;
    }


    // async function getTopTracks(){
    //     const results = await fetchWebApi('v1/me/top/tracks?limit=5', 'GET');
    //     console.log(results);  // Add this line to log the data
    //     return results.items as SpotifyTrack[];
    // }

    async function getUserProfile() {
        return await fetchWebApi('v1/me', 'GET') as SpotifyProfileType;
    }

    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getUserProfile();
            setSpotifyProfile(userProfile);
            // const userTopTracks = await getTopTracks();
            // setTopTracks(userTopTracks);
            // console.log(userTopTracks);
        };

        fetchData();
        console.log("spotifyProfile: ", spotifyProfile?.id)
    }, []);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    // useEffect(() => {
    //     getProfile();
    // }, [user, getProfile]);

    async function updateProfile({
                                     username,
                                     website,
                                     avatar_url,
                                 }: {
        username: string | null;
        fullname: string | null;
        website: string | null;
        avatar_url: string | null;
    }) {
        try {
            setLoading(true);

            let { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            });
            if (error) error;
            alert('Profile updated!');
        } catch (error) {
            alert('Error updating the data!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container mx-auto flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-300 p-8'>
            <Avatar
                uid={user!.id}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ fullname, username, website, avatar_url: url });
                }}
            />
            <h2 className='w-1/4 text-center text-lg font-medium'>
                User Metadata: {user?.user_metadata?.provider_id}
            </h2>

            <p className='text-center text-lg font-medium'>
                Session: {JSON.stringify(session?.provider_token)}
            </p>
            <SpotifyProfile profile={spotifyProfile} />
            <TopTracks tracks={topTracks} />

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
