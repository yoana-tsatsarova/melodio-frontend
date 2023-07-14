"use client"
import React, {useEffect, useState} from 'react'
import axios from "axios";

const Page = () => {

    const [response, setResponse] = useState('');

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://journeo.azurewebsites.net/');
                setResponse(response.data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }}

        fetchData();

    }, [])



    return (
        <div className={"text-6xl text-red-600 "}>{response}</div>
    )
}
export default Page
