"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Map from "@/components/Map";

const Page = () => {

    const [songIDs, setSongIDs] = useState<string[]>();
    const [country, setCountry] = useState('');
    const [longitude, setLongitude] = useState<number>(4.9041);
    const [latitude, setLatitude] = useState<number>(52.3676);

    const getTopTenTracks = async (e: any) => {
        e.preventDefault();

        try {
            const url = `https://melodio.azurewebsites.net/songs/${country}`;
            const response = await axios.get(url);
            const ids: string[] = await response.data;
            let idsArray: string[] = []
            for (let url of ids) {
                const songUrl = `https://open.spotify.com/embed/track/${url}?utm_source=generator`
                idsArray.push(songUrl);
            }
            setSongIDs(idsArray);

            const urlCoordinates = `https://melodio.azurewebsites.net/coordinates/${country}`;
            const responseCoordinates = await axios.get(urlCoordinates);
            setLatitude(responseCoordinates.data.latitude);
            setLongitude(responseCoordinates.data.longitude);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Input onChange={(e) => setCountry(e.target.value)}></Input>
            <Button type="submit" onClick={getTopTenTracks}>Add</Button>
            <div>
            {songIDs?.map((songID) => (
                <iframe
                    className="rounded-md py-4"
                    src={songID}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            ))}
            </div>

            {/*<Map />*/}
        </>
    )
}
export default Page
