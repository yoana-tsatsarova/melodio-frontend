"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";
import { Database } from "../database.types";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-300 p-8">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <h2 className="w-1/4 text-center text-lg font-medium">
        User Metadata: {user?.user_metadata?.provider_id}
      </h2>

      <h2 className="text-center text-lg font-medium">
        Session: {JSON.stringify(session)}
      </h2>

      <div className="flex w-full flex-col">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={session?.user.email}
          disabled
          className="mt-2 rounded border p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="fullName" className="font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="mt-2 rounded border p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 rounded border p-2"
        />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="website" className="font-medium">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-2 rounded border p-2"
        />
      </div>

      <div className="w-full">
        <button
          className={`w-full rounded py-2 ${
            loading ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div className="w-full">
        <form action="/auth/signout" method="post">
          <button
            className="w-full rounded bg-red-500 py-2 text-white"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
