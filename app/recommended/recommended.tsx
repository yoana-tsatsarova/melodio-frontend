"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import {Separator} from "@/components/ui/seperator";
import {Button} from "@/components/ui/button";

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
        console.log("THe Token",token)
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

        const main = async() => {
            try {
                const topTracks = await getTopTracks();
                const topTracksIds: string[] = topTracks.map(track => track.id);
                console.log(topTracksIds)
                // Get recommended tracks based on top tracks
                const recommendedTracks = await getRecommendations(topTracksIds);
                const recommendedTracksIds: string[] = recommendedTracks.map(track => track.id);

                const allTrackIds: string[] = [...topTracksIds, ...recommendedTracksIds];
                const trackURIS = allTrackIds.map(id => `spotify:track:${id}`);
                console.log(trackURIS)
                const createdPlaylist = await createPlaylist(trackURIS);
                const url = `https://open.spotify.com/embed/playlist/${createdPlaylist.id}?utm_source=generator&theme=0`
                setPlaylistUrl(url);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        async function createPlaylist(tracksUri: string[]) {
            const response = await fetchWebApi('v1/me', 'GET');
            const { id: user_id } = response as { id: string }; // Type assertion to inform TypeScript about the 'id' property

            const playlist: Playlist = await fetchWebApi(
                `v1/users/${user_id}/playlists`,
                'POST',
                {
                    "name": "Melodio Recommended",
                    "description": "Playlist created by Melodio based on your listening history",
                    "public": false
                }
            );

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
            <main className="flex  w-auto">
                <div className="col-span-6 lg:col-span-4 lg:border-r border-stone-700">
                    <section className="
      hidden
      md:flex
      flex-col
      gap-y-4
      h-full
      w-[300px]
      p-4
    ">
                    <Link href={"/explore"}>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6"
                            >
                                <path d="M21 15V6" />
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M12 12H3" />
                                <path d="M16 6H3" />
                                <path d="M12 18H3" />
                            </svg>
                            Explore
                        </Button>
                    </Link>
                    <Separator className="my-4"/>
                    <Link href={"/favorites"}>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-4 h-6 w-6"
                            >
                                <circle cx="8" cy="18" r="4" />
                                <path d="M12 18V2l7 4" />
                            </svg>
                            Your Favorites
                        </Button> </Link>
                    <Separator className="my-4"/>
                    <Link href={"/recommended"}>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-4 h-6 w-6"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Recommended
                        </Button>
                    </Link>
                    <Separator className="my-4"/>
                    <img src="/images/JavaPuffs_logo_black-removebg-preview%20(1).png"/>
                    <div className="avatar-group -space-x-6">
                        <div className="avatar border-none">
                            <div className="w-24 rounded-full">
                                <img src="/images/carolina.jpg" />
                            </div>
                        </div>
                        <div className="avatar border-none">
                            <div className="w-24 rounded-full">
                                <img src="/images/togrul.jpg" />
                            </div>
                        </div>
                        <div className="avatar border-none">
                            <div className="w-24 rounded-full">
                                <img src="/images/yoana.jpg" />
                            </div>
                        </div>
                        <div className="avatar border-none">
                            <div className="w-24 rounded-full">
                                <img src="/images/ryan.webp" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <iframe
                title="Spotify Embed: Recommendation Playlist "
                src={playlistUrl}
                width="50%"
                height="100%"
                style={{ minHeight: '600px' }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className={"mx-auto justify-center items-center flex rounded-2xl mt-6"}
            />
            </main>
        </>
    )
}

export default Recommended;
