
"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";
const Page = () => {

    const YOUR_SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1/me";
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getUserId = async () => {
            try {
                const accessToken = await axios.get("http://localhost:8080/getaccesstoken");
                console.log(accessToken.data)
                const response = await axios.get(YOUR_SPOTIFY_API_BASE_URL, {
                    headers: {
                        Authorization: `Bearer ${accessToken.data}`,
                    },
                });
                console.log(response.data)
            } catch (error) {
                console.log("Error fetching user ID:", error);
            }
        };

        getUserId();
    }, []);


    return (
        <div></div>
    )
}
export default Page
