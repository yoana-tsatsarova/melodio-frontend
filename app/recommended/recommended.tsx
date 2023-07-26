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

interface SpotifyResponse<T> {
    items?: T[];
    tracks?: T[];
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const Recommended = ({ session }: AccountFormProps) => {
    const [playlistUrl, setPlaylistUrl] = useState<string>("");

    useEffect(() => {
        const token = session?.provider_token;

        async function fetchWebApi<T>(endpoint: string, method: HttpMethod, body?: any): Promise<T> {
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
            const response = await fetchWebApi<SpotifyResponse<Track>>('v1/me/top/tracks?time_range=short_term&limit=5', 'GET');
            return response.items || [];
        }

        async function getRecommendations(topTracksIds: string[]): Promise<Track[]> {
            const response = await fetchWebApi<SpotifyResponse<Track>>(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET');
            return response.tracks || [];
        }

        async function createPlaylist(tracksUri: string[]): Promise<Playlist> {
            const { id: user_id } = await fetchWebApi<{ id: string }>('v1/me', 'GET')

            const playlist: Playlist = await fetchWebApi<Playlist>(
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

        async function main() {
            try {
                const topTracks = await getTopTracks();
                const topTracksIds: string[] = topTracks.map(track => track.id);

                // Get recommended tracks based on top tracks
                const recommendedTracks = await getRecommendations(topTracksIds);
                const recommendedTracksIds: string[] = recommendedTracks.map(track => track.id);

                const allTrackIds: string[] = [...topTracksIds, ...recommendedTracksIds];
                const trackURIS = allTrackIds.map(id => `spotify:track:${id}`);

                const createdPlaylist = await createPlaylist(trackURIS);
                const url = `https://open.spotify.com/embed/playlist/${createdPlaylist.id}?utm_source=generator&theme=0`
                setPlaylistUrl(url);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
