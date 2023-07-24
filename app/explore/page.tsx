"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";

const Page = () => {
  const [songUrls, setSongUrls] = useState<string[]>();
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState<number>(4.9041);
  const [latitude, setLatitude] = useState<number>(52.3676);
  const [songIds, setSongIds] = useState<string[]>([]);

  const getTopTenTracks = async (e: any) => {
    e.preventDefault();

    try {
      const url = `https://melodio.azurewebsites.net/songs/${country}`;
      const response = await axios.get(url);
      const ids: string[] = await response.data;
      let urlArray: string[] = [];
      for (let id of ids) {
        const songUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
        urlArray.push(songUrl);
      }
      setSongUrls(urlArray);
      setSongIds(ids);
      console.log(urlArray);

      const urlCoordinates = `https://melodio.azurewebsites.net/coordinates/${country}`;
      const responseCoordinates = await axios.get(urlCoordinates);
      setLatitude(responseCoordinates.data.latitude);
      setLongitude(responseCoordinates.data.longitude);
    } catch (error) {
      console.error(error);
    }
  };
  const addSongToPlaylist = async (e: any, songId: string) => {
    e.preventDefault();
    const url = "https://melodio.azurewebsites.net/addsong"; // Replace with your API endpoint URL
    const data = {
      songId: songId,
    };

    try {
      const response = await axios.post(url, data);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="flex h-auto w-full ">
        <section className="flex w-1/5 flex-col font-semibold space-y-10 h-full px-10 text-xl bg-gray-900 text-slate-50">
          <Link href={"/"}>
            <h2 className="pt-20">Home</h2>
          </Link>

          <h2>Globe</h2>
          <Link href={"/favorites"}>
            <h2>Favorites</h2>
          </Link>

          <h2>Recommended</h2>
          <h2>Quiz</h2>
          <h2>About Us</h2>
        </section>
        <div className={"w-full"}>
          <div className="flex w-full max-w-xl mx-auto items-center space-x-2">
            <Input
              placeholder={"Enter a Country"}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button
              className="py-4 my-4"
              type="submit"
              onClick={getTopTenTracks}
            >
              Add
            </Button>
          </div>
          <div className="w-full  ">
            <div>
              <MapBox
                key={`${latitude}-${longitude}`}
                longitude={longitude}
                latitude={latitude}
              />
            </div>
          </div>
          <div>
            <div className="  p-4 overflow-auto">
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {songUrls?.map((songUrl) => (
                  <div key={songUrl}>
                    <iframe
                      className="rounded-md"
                      src={songUrl}
                      width="100%"
                      height="300"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                    <form>
                      <Button
                        className={
                          "bg-slate-50 hover:bg-slate-300 text-slate-900 -top-2"
                        }
                        onClick={(e) =>
                          addSongToPlaylist(
                            e,
                            songIds[songUrls?.indexOf(songUrl)]
                          )
                        }
                      >
                        Add to Favorite
                      </Button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
