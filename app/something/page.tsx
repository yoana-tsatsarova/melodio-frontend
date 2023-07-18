"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";

const Page = () => {

    const [playlistID, setPlaylistID] = useState('');
    const [country, setCountry] = useState('');
    const [songs, setSongs] = useState<String[]>([])

      const getTopTenTracks = async (e: any) =>  {
          e.preventDefault();

          try {
              const url = 'http//localhost:8080';
              const response = await axios.get(url);
              const id: string = await response.data;
              console.log(id);
              await setPlaylistID(id);

          } catch (error) {
              console.error(error);
          }
      }

    return (
        <>
                <Input onChange={(e) => setCountry(e.target.value)} ></Input>
                <Button type="submit" onClick={getTopTenTracks}>Add</Button>
        </>
    )
}
export default Page
