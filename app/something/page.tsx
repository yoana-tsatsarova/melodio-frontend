"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import Map from "@/components/Map";

const Page = () => {

    const [songID, setSongID] = useState('');
    const [country, setCountry] = useState('');
    const [songs, setSongs] = useState<String[]>([])

    const getTopTenTracks = async (e: any) => {
        e.preventDefault();

        try {
            const url = `https://journeo.azurewebsites.net/${country}`;
            const response = await axios.get(url);
            const id: string = await response.data;
            console.log(id);
            const songUrl = `https://open.spotify.com/embed/track/${id}?utm_source=generator`
            setSongID(songUrl)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Input onChange={(e) => setCountry(e.target.value)}></Input>
            <Button type="submit" onClick={getTopTenTracks}>Add</Button>

            <iframe
                className="rounded-md py-4"
                src={songID}
                width="50%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>

            <Map />
        </>
    )
}
export default Page
