"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";

const Page = () => {

    const accessToken = 'BQBxR0XaPin2uOgID_33uw2uz39_kKLfe5tlSxKtthdYwSCiqro6ubXrLZcRhAAwmV061Jetl18_FqQzuhEDVMzOZvoOUeo6f5wPNQrinddZepuIL5c'

    const [response, setResponse] = useState('');

    const [playlistID, setPlaylistID] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://api.spotify.com/v1/search?q=Viral+50+Netherlands&type=playlist&market=NL&limit=1';
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };


                const response = await axios.get(url, { headers });
                console.log(response.data.playlists.items[0].id);

                setResponse(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);




    return (
        <div className={"text-6xl text-red-600 "}>{response.length}</div>
    )
}
export default Page
