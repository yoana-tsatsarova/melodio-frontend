"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { Database } from "../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface AvatarProps {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ uid, url, size, onUpload }) => {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
            .from("avatars")
            .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

      if (error) {
        throw error;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar: " + error);
    } finally {
      setUploading(false);
    }
  };

  return (
      <div className="flex flex-col items-center">
        {avatarUrl ? (
            <Image
                width={size}
                height={size}
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full"
            />
        ) : (
            <div className=" bg-gray-200" style={{ height: size, width: size }} />
        )}
        <div className="mt-2">
          <label
              className={`block rounded py-2 px-6 ${
                  uploading ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
              htmlFor="single"
          >
            {uploading ? "Uploading ..." : "Upload"}
          </label>
          <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
          />
        </div>
      </div>
  );
}

export default Avatar;
