"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Session } from "@supabase/auth-helpers-nextjs";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Separator } from "@/components/ui/seperator";

interface Song {
    id: string;
}

interface AccountFormProps {
    session: Session | null;
}

const FavoritesPage = ({ session }: AccountFormProps) => {
    const [songUrls, setSongUrls] = useState<string[]>([]);
    const [songIds, setSongIds] = useState<string[]>([]);
    const [playlistName, setPlaylistName] = useState<string>('');
    const [playlistUrl, setPlaylistUrl] = useState<string>('');
    const [createdPlaylist, setCreatedPlaylist] = useState<boolean>(false);

    const getFavorites = async () => {
        try {
            const url = "https://melodio.azurewebsites.net/favorites";
            const response = await axios.get<Song[]>(url);
            setSongIds(response.data.map((song) => song.id));
            let urlArray: string[] = [];
            for (let id of response.data.map((song) => song.id)) {
                const songUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
                urlArray.push(songUrl);
            }
            setSongUrls(urlArray);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch favorites.");
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const deleteSongFromPlaylist = async (e: React.MouseEvent<HTMLButtonElement>, songId: string) => {
        try {
            e.stopPropagation();
            const url = `https://melodio.azurewebsites.net/favorites/${songId}`;
            await axios.delete(url);
            setSongIds(songIds.filter((id) => id !== songId));
            getFavorites();
            toast.success("Song deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete song!");
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(event.target.value);
    };

    const addSongsToSpotifyPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("session: ", session)
        try {
            const url = `https://api.spotify.com/v1/users/${session?.user.user_metadata.provider_id}/playlists`;
            const accessToken = session?.provider_token;

            const playlistData = {
                name: playlistName,
                description: 'Favorite songs from Melodio',
                public: false,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(url, playlistData, config);
            const playlistId = response.data.playlist.id;
            const trackURIS = songIds.map(id => `spotify:track:${id}`);
            for (let i = 0; i < songIds.length; i++) {
                const url = `https://melodio.azurewebsites.net/favorites/${songIds[i]}`;
                await axios.delete(url);
            }
            setSongIds([]);
            setSongUrls([]);
            getFavorites();
            const playUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
            setPlaylistUrl(playUrl);

            await axios.post(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                { uris: trackURIS },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setCreatedPlaylist(true);
            toast.success("Playlist created and tracks added successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create playlist.");
        }
    }

    return (
        <>
            <main className="flex w-full">
                {/* Left Sidebar */}
                <div className="col-span-6 lg:col-span-4 lg:border-r">
                    {/* Sidebar Content */}
                </div>

                {/* Main Content */}
                <form onSubmit={addSongsToSpotifyPlaylist}>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={handleInputChange}
                        placeholder="Enter your playlist name"
                    />
                    <button type="submit">Create Spotify Playlist</button>
                </form>
                {createdPlaylist && (
                    <iframe
                        title="Spotify Embed: Recommendation Playlist "
                        src={playlistUrl}
                        width="50%"
                        height="100%"
                        style={{ minHeight: '800px' }}
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                )}
                <div className="grid grid-cols-4 gap-4 place-items-center mx-auto">
                    {songUrls?.map((songUrl, index) => (
                        <div key={index} className="group">
                            <iframe
                                className="rounded-md -mb-6"
                                src={songUrl}
                                width="100%"
                                height="270px"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="invisible group-hover:visible bg-amber-700 rounded-xl mx-auto mb-4 w-full flex hover:bg-slate-300 text-slate-50 -top-2 transition delay-7000 duration-800 ease-in-out"
                                    >
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-stone-100">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this song from your favorites.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={(e) =>
                                            deleteSongFromPlaylist(e, songIds[index])
                                        }>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))}
                    <ToastContainer autoClose={1200} theme="dark" />
                </div>
            </main>
        </>
    );
};

FavoritesPage.defaultProps = {
    session: null,
};

export default FavoritesPage;
