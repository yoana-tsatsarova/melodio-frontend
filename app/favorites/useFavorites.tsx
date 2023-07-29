"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Session } from "@supabase/auth-helpers-nextjs";
import { toast } from 'react-toastify';

export const useFavorites = (session: Session | null) => {
    const [songUrls, setSongUrls] = useState<string[]>([]);
    const [songIds, setSongIds] = useState<string[]>([]);

    const getFavorites = async () => {
        try {
            const url = "https://melodio.azurewebsites.net/favorites";
            const response = await axios.get(url);
            const ids = response.data.map((songId: { id: string }) => songId.id);
            setSongIds(ids);

            const urlArray = ids.map(id => `https://open.spotify.com/embed/track/${id}?utm_source=generator`);
            setSongUrls(urlArray);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSongFromPlaylist = async (songId: string) => {
        try {
            const url = `https://melodio.azurewebsites.net/favorites/${songId}`;
            await axios.delete(url);
            setSongIds(prev => prev.filter(id => id !== songId));
            getFavorites();
            toast.success("Song deleted successfully!"); // Display the success toast
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete song!"); // Display the error toast
        }
    };

    const addSongsToSpotifyPlaylist = async () => {
        if (!session) return;
        const url = `https://api.spotify.com/v1/users/${session.user.user_metadata.provider_id}/playlists`;
        const accessToken = session.provider_token;

        const playlistData = {
            name: 'Melodio Favorites',
            description: 'Favorite songs from Melodio',
            public: false,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            // Step 1: Create the playlist on Spotify
            const response = await axios.post(url, playlistData, config);
            const playlistId = response.data.id;

            // Step 2: Prepare an array of track URIs
            const trackUris = songIds.map(id => `spotify:track:${id}`);

            // Step 3: Add songs to the playlist
            const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            const requestData = {
                uris: trackUris,
                position: 0,
            };

            await axios.post(apiUrl, requestData, config);

            console.log('Successfully added tracks to playlist!');
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);

    return { songUrls, songIds, deleteSongFromPlaylist, addSongsToSpotifyPlaylist };
};
