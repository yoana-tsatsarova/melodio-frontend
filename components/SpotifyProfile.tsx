import React from 'react';

interface SpotifyProfile {
    display_name: string;
    email: string;
    images: { url: string }[];
}

interface SpotifyProfileProps {
    profile: SpotifyProfile | null;
}

const SpotifyProfile: React.FC<SpotifyProfileProps> = ({ profile }) => {
    if (!profile) return null;

    return (
        <div>
            <img src={profile.images[0]?.url} alt="user profile"/>
            <h2>Spotify User Profile</h2>
            <p>Name: {profile.display_name}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default SpotifyProfile;
