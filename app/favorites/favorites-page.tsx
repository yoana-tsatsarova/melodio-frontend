"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Session} from "@supabase/auth-helpers-nextjs";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import {Separator} from "@/components/ui/seperator";

interface AccountFormProps {
    session: Session | null;
}
const FavoritesPage = ({session}: AccountFormProps) => {
    const [songUrls, setSongUrls] = useState<string[]>();
    const [songIds, setSongIds] = useState<string[]>([]);
    const [playlistName, setPlaylistName] = useState<string>('');

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

    const deleteSongFromPlaylist = async (e: any, songId: string) => {
        try {
            const url = `https://melodio.azurewebsites.net/favorites/${songId}`;
            await axios.delete(url);
            setSongIds(songIds?.filter((id) => id !== songId));
            getFavorites();
            toast.success("Song deleted successfully!"); // Display the success toast
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete song!"); // Display the error toast
        }
    };

    const addSongsToSpotifyPlaylist = async (e: any) => {
        e.preventDefault();
        const url = `https://api.spotify.com/v1/users/${session?.user.user_metadata.provider_id}/playlists`;
        const accessToken = session?.provider_token;

        const playlistData = {
            name: 'Melodio Favorites',
            description: 'Favorite songs from Melodio',
            public: false,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            // Step 1: Create the playlist on Spotify
            const response = await axios.post(url, playlistData, config);
            const playlistId = response.data.id;

            // Step 2: Prepare an array of track URIs
            const trackUris = songIds.map(id => `spotify:track:${id}`);

            // Step 3: Add songs to the playlist
            const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            const requestData = {
                uris: trackUris,
                position: 0,
            };

            await axios.post(apiUrl, requestData, config);

            console.log('Successfully added tracks to playlist!');
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
    }



    return (
        <>

            <main className={"flex "}>

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
                            </Button>
                           </Link>
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
               <div className={"justify-center mx-auto w-max items-center"}> <div className={"flex flex-row justify-end  pt-4 pr-4"}> <Button className="bg-spotify-green rounded-xl  " onClick={addSongsToSpotifyPlaylist}>Add to Spotify</Button></div>
                   <div className="grid grid-cols-1 md:grid-cols-3  gap-x-12 p-4 justify-items-center mx-auto w-fit">

                       {songUrls?.map((songUrl) => (
                           <div key={songUrl} className={"group"}>
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
                                   <AlertDialogContent className={"bg-stone-900"}>
                                       <AlertDialogHeader>
                                           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                           <AlertDialogDescription>
                                               This action cannot be undone. This will permanently delete your
                                               favorites and remove your songs from your playlist.
                                           </AlertDialogDescription>
                                       </AlertDialogHeader>
                                       <AlertDialogFooter>
                                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                                           <AlertDialogAction className={"text-spotify-green"} onClick={(e) =>
                                               deleteSongFromPlaylist(e, songIds[songUrls?.indexOf(songUrl)])
                                           }>Continue</AlertDialogAction>
                                       </AlertDialogFooter>
                                   </AlertDialogContent>
                               </AlertDialog>
                           </div>
                       ))}
                       <ToastContainer autoClose={1200} theme={"dark"} />
                   </div></div></main>
        </>
    );
};
export default FavoritesPage;
