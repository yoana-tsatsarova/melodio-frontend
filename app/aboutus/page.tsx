import React from 'react'
import HeroSection from "@/components/HeroSection";
import Aboutus from "@/components/Aboutus";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import TechUsed from "@/components/TechUsed";

const Page = () => {
    return (
        <>
            <section>
                <Aboutus />
                <Skills />
                <Works />
                <TechUsed />
            </section>
        </>
    )
}
export default Page
