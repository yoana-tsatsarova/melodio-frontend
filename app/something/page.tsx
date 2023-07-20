"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import MapBox from "@/components/MapBox";

const Page = () => {

    const [songUrls, setSongUrls] = useState<string[]>();
    const [country, setCountry] = useState('');
    const [longitude, setLongitude] = useState<number>(4.9041);
    const [latitude, setLatitude] = useState<number>(52.3676);
    const [songIds, setSongIds] = useState<string[]>([]);

    const getTopTenTracks = async (e: any) => {
        e.preventDefault();

        try {
            const url = `https://melodio.azurewebsites.net/songs/${country}`;
            const response = await axios.get(url);
            const ids: string[] = await response.data;
            let urlArray: string[] = []
            for (let id of ids) {
                const songUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator`
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
    }
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
    }

    return (
        <div className="flex h-screen w-full">
            <div className="w-1/2 p-4 overflow-auto">
                <Input onChange={(e) => setCountry(e.target.value)}/>
                <Button className="py-4 my-4" type="submit" onClick={getTopTenTracks}>
                    Add
                </Button>
                <div className="grid grid-cols-3 gap-4">
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
                            <Button onClick={(e)=> addSongToPlaylist(e,songIds[songUrls?.indexOf(songUrl)])}>Add to Favorite</Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/2">
                <MapBox key={`${latitude}-${longitude}`} longitude={longitude} latitude={latitude}/>
            </div>
        </div>
    );
};

export default Page;
