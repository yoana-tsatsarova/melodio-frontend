"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/legacy/image";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
                                 uid,
                                 url,
                                 size,
                                 onUpload,
                               }: {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
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

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
      event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
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
