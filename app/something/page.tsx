"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Map from "@/components/Map";

const Page = () => {

    const [songIDs, setSongIDs] = useState<String[]>();
    const [country, setCountry] = useState('');
    const [songs, setSongs] = useState<string[]>([])

    const getTopTenTracks = async (e: any) => {
        e.preventDefault();

        try {
            // const url = `https://journeo.azurewebsites.net/${country}`;
            const url = `http://localhost:8080/${country}`;
            const response = await axios.get(url);
            const ids: string[] = await response.data;
            let idsArray: string[] = []
            for (let url of ids) {
                const songUrl = `https://open.spotify.com/embed/track/${url}?utm_source=generator`
                idsArray.push(songUrl);
            }
            setSongIDs(idsArray);
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
