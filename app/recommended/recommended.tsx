"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Session } from "@supabase/auth-helpers-nextjs";

interface Track {
    id: string;
}

interface Playlist {
    id: string;
    name: string;
}

interface AccountFormProps {
    session: Session | null;
}

const Recommended = ({ session }: AccountFormProps) => {
    const [topSongsIds, setTopSongsIds] = useState<string[]>();
    const [recommendedSongsIds, setRecommendedSongsIds] = useState<string[]>();

    useEffect(() => {
        const token = session?.provider_token;
        console.log(token);

        async function fetchWebApi<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any): Promise<T> {
            const res = await axios(`https://api.spotify.com/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method,
                data: body,
            });
            return res.data as T;
        }

        async function getTopTracks(): Promise<Track[]> {
            const response = await fetchWebApi<{ items: Track[] }>('v1/me/top/tracks?time_range=short_term&limit=5', 'GET');
            return response.items;
        }

        // const allSongIds: string[] =
        //
        // async function getRecommendations(topTracksIds: string[]): Promise<Track[]> {
        //     const response = await fetchWebApi<{ tracks: Track[] }>(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET');
        //     return response.tracks;
        // }
        //
        //     async function main() {
        //     try {
        //         const topTracks = await getTopTracks();
        //         const topTracksIds: string[] = topTracks.map(track => track.id);
        //         console.log(topTracksIds)
        //         setTopSongsIds(topTracksIds);
        //
        //         // Get recommended tracks based on top tracks
        //         const recommendedTracks = await getRecommendations(topTracksIds);
        //         const recommendedTracksIds: string[] = recommendedTracks.map(track => track.id);
        //         console.log(recommendedTracksIds);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // }
        //
        // main();



    }, [session]);

    return (
        <></>
    )
}

export default Recommended;
