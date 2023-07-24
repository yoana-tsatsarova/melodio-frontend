import React from 'react';
import {SpotifyTrack} from "@/types/types";

interface TopTracksProps {
    tracks: SpotifyTrack[] | null;
}

const TopTracks: React.FC<TopTracksProps> = ({ tracks }) => {
    if (!tracks) return null;

    return (
        <div>
            <h2>Top Tracks</h2>
            {tracks.map((track, index) => (
                <div key={index}>
                    <p>Track Name: {track.name}</p>
                    <p>Artists: {track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default TopTracks;
