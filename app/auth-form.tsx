import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";
import { useEffect, useState } from "react";

const AuthForm = () => {
  const supabase = createClientComponentClient<Database>();
  const [spotifySuccess, setSpotifySuccess] = useState(false);

  useEffect(() => {
    if (spotifySuccess) {
      // You can handle the successful Spotify authentication here
      console.log("Spotify authentication successful!");
      // Perform any additional actions or redirect to a different page as needed
    }
  }, [spotifySuccess]);

  const handleAuthStateChange = (event: any) => {
    if (event.error) {
      console.log("Spotify authentication error:", event.error);
    } else {
      setSpotifySuccess(true);
    }
  };

  return (
      <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          showLinks={false}
          providers={["spotify"]}
          redirectTo="https://supabase-nextjs-user-spotify.vercel.app/auth/callback"
      />
  );
};

export default AuthForm;
