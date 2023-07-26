"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"
import {Separator} from "@/components/ui/seperator";


interface Location {
  lng: number;
  lat: number;
}

const Page = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [songUrls, setSongUrls] = useState<string[]>();
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState<number>(4.9041);
  const [latitude, setLatitude] = useState<number>(52.3676);
  const [songIds, setSongIds] = useState<string[]>([]);

  const getCountryLocation = async (country: string): Promise<Location> => {
    // Replace this with actual API call to get the location of a country
    const url = `https://melodio.azurewebsites.net/coordinates/${country}`;
    const response = await axios.get(url);
    return { lng: response.data.longitude, lat: response.data.latitude };
  };

  const addCountry = async (e: any) => {
    e.preventDefault();
    const countryLocation = await getCountryLocation(country);
    setLocations(prevLocations => [...prevLocations, countryLocation]);
  };

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

      const countryLocation = await getCountryLocation(country);
      setLatitude(countryLocation.lat);
      setLongitude(countryLocation.lng);
    } catch (error) {
      console.error(error);
    }
  };

  const addSongToPlaylist = async (e: any, songId: string) => {
    e.preventDefault();
    const url = "https://melodio.azurewebsites.net/addsong";
    const data = {
      songId: songId,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Response:", response.data);
      toast.success("Song added to favorites successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add song to favorites!");
    }
  };

  return (
      <>
        <ToastContainer autoClose={1200} theme={"dark"} />
        <main className="flex h-auto w-full ">
          <section   className="
          hidden
          md:flex
          flex-col
          gap-y-4

          h-full
          w-[300px]
          p-4
        ">

            <Link href={"/"}>
              <h2 className="pt-20">Home</h2>
            </Link>
            <Separator className="my-4"/>
            <h2>Explore</h2>
            <Separator className="my-4"/>
            <Link href={"/favorites"}>
              <h2>Favorites</h2>
            </Link>
            <Separator className="my-4"/>
            <h2>Recommended</h2>
            <Separator className="my-4"/>
            <h2>About Us</h2>
          <Separator className="my-4"/>
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
                    locations={locations}
                    latitude={latitude}
                    longitude={longitude}
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
                            <FaHeart /> Add to Favorite
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
