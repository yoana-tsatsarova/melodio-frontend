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
    const [allTrackUris, setAllTrackUris] = useState<string[]>();
    const [playlistUrl, setPlaylistUrl] = useState<string>("");

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

        async function getRecommendations(topTracksIds: string[]): Promise<Track[]> {
            const response = await fetchWebApi<{ tracks: Track[] }>(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET');
            return response.tracks;
        }

        async function main() {
            try {
                const topTracks = await getTopTracks();
                const topTracksIds: string[] = topTracks.map(track => track.id);
                setTopSongsIds(topTracksIds);

                // Get recommended tracks based on top tracks
                const recommendedTracks = await getRecommendations(topTracksIds);
                const recommendedTracksIds: string[] = recommendedTracks.map(track => track.id);
                setRecommendedSongsIds(recommendedTracksIds);

                const allTrackIds: string[] = [...topTracksIds, ...recommendedTracksIds];
                const trackURIS = allTrackIds.map(id => `spotify:track:${id}`);
                setAllTrackUris(trackURIS);

                const createdPlaylist = await createPlaylist(trackURIS);
                const url = `https://open.spotify.com/embed/playlist/${createdPlaylist.id}?utm_source=generator&theme=0`
                setPlaylistUrl(url);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function createPlaylist(tracksUri: string[]){
            const { id: user_id } = await fetchWebApi('v1/me', 'GET')

            const playlist: Playlist = await fetchWebApi(
                `v1/users/${user_id}/playlists`, 'POST', {
                    "name": "Melodio Recommended",
                    "description": "Playlist created by Melodio based on your listening history",
                    "public": false
                })

            await fetchWebApi(
                `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
                'POST'
            );

            return playlist;
        }

        main();



    }, []);

    return (
        <>
            <iframe
                title="Spotify Embed: Recommendation Playlist "
                src={playlistUrl}
                width="50%"
                height="100%"
                style={{ minHeight: '800px' }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </>
    )
}

export default Recommended;
