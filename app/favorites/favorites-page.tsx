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
import {Form} from "react-hook-form";
import alertDialogStories from "@radix-ui/react-alert-dialog/src/AlertDialog.stories";

interface AccountFormProps {
    session: Session | null;
}
const FavoritesPage = ({session}: AccountFormProps) => {
    const [songUrls, setSongUrls] = useState<string[]>();
    const [songIds, setSongIds] = useState<string[]>([]);
    const [playlistName, setPlaylistName] = useState<string>('');
    const [playlistUrl, setPlaylistUrl] = useState<string>('');
    const [createdPlaylist, setCreatedPlaylist] = useState<boolean>(false);

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
            name: {playlistName},
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
        setSongIds([]);
        setSongUrls([]);
        for (let i = 0; i < songIds.length; i++) {
            const url = `https://melodio.azurewebsites.net/favorites/${songIds[i]}`;
            await axios.delete(url);
        }
        getFavorites();
        const playUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
        setPlaylistUrl(playUrl);

        await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: trackURIS,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        setCreatedPlaylist(true);


        console.log('Playlist created and tracks added successfully!');
    } catch (error) {
            console.log(error);
    }

    }

    return (
        <>
  <main className={"flex w-full"}>
      <div className="col-span-6 lg:col-span-4 lg:border-r">
      <section   className="
          hidden
          md:flex
          flex-col
          gap-y-4
          h-full
          w-[300px]
          p-4
        ">

          {/*<Link href={"/"}>*/}
          {/*    <div className="px-3 py-4">*/}
          {/*        <h2 className="mb-2 px-4 text-lg font-semibold text-spotify-green tracking-tight">*/}
          {/*            Melodio World 🌍*/}
          {/*        </h2>*/}
          {/*    </div>*/}
          {/*</Link>*/}
          {/*<Separator className="my-4"/>*/}
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
          <h2>About Us</h2>
          <Separator className="my-4"/>
      </section>
  </div>
      <form onSubmit={addSongsToSpotifyPlaylist}>
          <input
              type="text"
              value={playlistName}
              onChange={handleInputChange}
              placeholder="Enter your playlist name"
          />
          <button type="submit">Create Spotify Playlist</button>
      </form>
      <div className="grid grid-cols-4 gap-4 place-items-center mx-auto">
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
                      <AlertDialogContent className={"bg-stone-100"}>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this song from your favorites.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={(e) =>
                                  deleteSongFromPlaylist(e, songIds[songUrls?.indexOf(songUrl)])
                              }>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </div>
          ))}
          <ToastContainer autoClose={1200} theme={"dark"} />
      </div>
      {createdPlaylist && <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={playlistUrl}
          width="50%"
          height="100%"
          style={{ minHeight: '800px' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
      />}</main>
        </>
    );
};
export default FavoritesPage;
