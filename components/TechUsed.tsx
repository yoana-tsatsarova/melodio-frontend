"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
const Aboutus = () => {
  const router = useRouter();
  return (
    <section
      className={`flex flex-col h-half-screen  mx-auto justify-center items-center bg-gray-900 text-gray-100 md:text-4xl text-3xl`}>
      <div className="container mx-auto px-11 text-center py-14">
        <h2 >
          <strong className="mb-4">Technologies</strong>
        </h2>
        <Button onClick={() => {
          // Redirect to the login page
          router.push("/explore")} } variant={"outline"} className="w-40 shadow py-4 hover:text-gray-700 font-semibold justify-center text-spotify-green rounded-xl mx-auto my-8 flex hover:bg-slate-300   transition delay-100 duration-300 ease-in-out">
          Explore
        </Button>
        <div className="mt-10 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9 gap-6 lg:gap-20">
          <img src="/images/logos/java.svg"/>
          <img src="/images/logos/boot.svg"/>
          <img src="/images/logos/typescript.svg"/>
          <img src="/images/logos/native.svg"/>
          <img src="/images/logos/azure.svg"/>
          <img src="/images/logos/tailwindcss.svg"/>
          <img src="/images/logos/postgresql.svg"/>
          <img src="/images/logos/next.svg"/>
          <img src="/images/logos/vercel.svg"/>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;
