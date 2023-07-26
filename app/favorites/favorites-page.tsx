"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Session} from "@supabase/auth-helpers-nextjs";
import scope from "@maplibre/maplibre-gl-style-spec/src/expression/scope";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface AccountFormProps {
    session: Session | null;
}
const FavoritesPage = ({session}: AccountFormProps) => {
    const [songUrls, setSongUrls] = useState<string[]>();
    const [songIds, setSongIds] = useState<string[]>([]);

    const getFavorites = async () => {
        try {
            const url = "https://melodio.azurewebsites.net/favorites";
            const response = await axios.get(url);
            setSongIds(response.data.map((songId: { id: string }) => songId.id));
            console.log(response.data.map((songId: { id: string }) => songId.id));
            let urlArray: string[] = [];
            for (let id of response.data.map((songId: { id: string }) => songId.id)) {
                const songUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
                urlArray.push(songUrl);
            }
            setSongUrls(urlArray);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getFavorites();
    }, []);
    //
    // useEffect(() => {
    //     getFavorites();
    // }, [songIds]);
    const deleteSongFromPlaylist = async (e: any, songId: string) => {
        try {
            const url = `https://melodio.azurewebsites.net/favorites/${songId}`;
            await axios.delete(url);
            setSongIds(songIds?.filter((id) => id !== songId));
            toast.success("Song deleted successfully!"); // Display the success toast
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete song!"); // Display the error toast
        }
    };

    const createSpotifyPlaylist = async () => {
        const url = `https://api.spotify.com/v1/users/${session?.user.user_metadata.provider_id}/playlists`;
        const accessToken = session?.provider_token;
        console.log(session?.provider_token)// Replace this with your actual access token

        const playlistData = {
            name: 'Melodio',
            description: 'Favorite songs from Melodio',
            public: false,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        axios.post(url, playlistData, config)
            .then((response) => {
                console.log('Playlist created successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error creating playlist:', error.message);
            });
    }
    const addSongsToSpotifyPlaylist = async () => {
        await createSpotifyPlaylist();

    }

    return (
        <>
            <Button onClick={addSongsToSpotifyPlaylist}>Add to Spotify</Button>
            <div className="grid grid-cols-3 gap-4 place-items-center mx-auto">
                {songUrls?.map((songUrl) => (
                    <div key={songUrl} className="w-64">
                        <iframe
                            className="rounded-md py-4"
                            src={songUrl}
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                        <Button
                            className="bg-amber-700 text-white"
                            onClick={(e) =>
                                deleteSongFromPlaylist(e, songIds[songUrls?.indexOf(songUrl)])
                            }
                        >
                            Delete

                        </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        favorites and remove your songs from your playlist.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}{" "}
                <ToastContainer autoClose={1200} theme={"dark"} />
            </div>
        </>
    );
};
export default FavoritesPage;
