"use client";
import React, {useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaHeart} from 'react-icons/fa';
import Link from "next/link";
import {Separator} from "@/components/ui/seperator";
import Marquee from "react-fast-marquee";


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
        return {lng: response.data.longitude, lat: response.data.latitude};
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
        const url = "https://melodio.azurewebsites.net/songs/add";
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

    return <>
        <ToastContainer autoClose={1200} theme={"dark"}/>
        <main className={"flex  w-full"}>
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
                    <Link href={"/explore"} legacyBehavior>
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
                                <path d="M21 15V6"/>
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                                <path d="M12 12H3"/>
                                <path d="M16 6H3"/>
                                <path d="M12 18H3"/>
                            </svg>
                            Explore
                        </Button>
                    </Link>
                    <Separator className="my-4"/>
                    <Link href={"/favorites"} >
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
                                <circle cx="8" cy="18" r="4"/>
                                <path d="M12 18V2l7 4"/>
                            </svg>
                            Your Favorites
                        </Button> </Link>
                    <Separator className="my-4"/>
                    <Link href={"/recommended"} legacyBehavior>
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
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
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
            <div className="w-full overflow-hidden">
                <div className="flex w-full max-w-xl mx-auto items-center space-x-2">
                    <form   className={"rounded-md flex space-x-2 items-center justify-center"} onSubmit={(e) => { getTopTenTracks(e); }}>
                        <Input
                            className={"rounded-md w-60 md:w-80"}
                            placeholder={"Enter a Country"}
                            onChange={(e) => setCountry(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        />
                        <Button
                            className="px-9 my-2 h-9 rounded-md border-stone-700 hover:bg-spotify-green"
                            type="submit"
                            variant={"outline"}
                        >
                            Explore
                        </Button>
                    </form>

                </div>
                <div className="w-auto overflow-hidden">
                    <div>
                        <MapBox
                            locations={locations}
                            latitude={latitude}
                            longitude={longitude}
                        />
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="  p-4">
                        <Marquee pauseOnHover={true}>
                            <div className="flex space-x-4 bg-gray-1000 px-1 rounded-md gap-2">
                                {songUrls?.map((songUrl) => (
                                    <div key={songUrl} className={"group"}>

                                        <iframe
                                            className="rounded-md -mb-4 overflow-hidden max-h-[260px]"
                                            src={songUrl}
                                            height="270px"
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        ></iframe>

                                        <form action="">
                                            <Button
                                                className={
                                                    "invisible group-hover:visible bg-spotify-green rounded-xl mx-auto flex hover:bg-slate-300 text-slate-900 -top-2 transition delay-7000 duration-800 ease-in-out "
                                                }
                                                onClick={(e) =>
                                                    addSongToPlaylist(
                                                        e,
                                                        songIds[songUrls?.indexOf(songUrl)]
                                                    )
                                                }
                                            >
                                                <FaHeart/> Add to Favorite
                                            </Button>
                                        </form>
                                    </div>

                                ))}


                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </main>
    </>;
};

export default Page;
