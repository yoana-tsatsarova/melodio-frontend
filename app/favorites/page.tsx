"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = () => {
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

  useEffect(() => {
    getFavorites();
  }, [songIds]);
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

  return (
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
              <Button
                  className="bg-amber-700 text-white"
                  onClick={(e) =>
                      deleteSongFromPlaylist(e, songIds[songUrls?.indexOf(songUrl)])
                  }
              >
                Delete

              </Button>
            </div>
        ))}{" "}
        <ToastContainer autoClose={1200} theme={"dark"} />
      </div>
  );
};
export default Page;
