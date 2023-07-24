export interface SpotifyArtist {
    name: string;
}

export interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
}

export interface SpotifyProfile {
    display_name: string;
    email: string;
    images: { url: string }[];
}
