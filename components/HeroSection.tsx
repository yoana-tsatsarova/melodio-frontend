"use client";
import Image from 'next/image';
import styles from '../app/page.module.scss';
import React, { useRef, MouseEvent } from 'react';
import gsap from 'gsap';
import floating1 from '../public/images/image_1.jpg';
import floating2 from '../public/images/image_2.jpg';
import floating3 from '../public/images/image_3.jpg';
import floating4 from '../public/images/image_4.jpg';
import floating5 from '../public/images/image_5.jpg';
import floating6 from '../public/images/image_6.jpg';
import floating9 from '../public/images/image_9.jpg';
import floating11 from '../public/images/image_10.jpg';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";

const HeroSection = () => {
    const plane1 = useRef<HTMLDivElement>(null);
    const plane2 = useRef<HTMLDivElement>(null);
    const plane3 = useRef<HTMLDivElement>(null);
    let requestAnimationFrameId: number | null = null;
    let xForce = 0;
    let yForce = 0;
    const easing = 0.08;
    const speed = 0.01;

    const manageMouseMove = (e: MouseEvent) => {
        const { movementX, movementY } = e;
        xForce += movementX * speed;
        yForce += movementY * speed;

        if(requestAnimationFrameId == null){
            requestAnimationFrameId = requestAnimationFrame(animate);
        }
    }

    const lerp = (start: number, target: number, amount: number): number => start * (1 - amount) + target * amount;
    const router = useRouter();
    const animate = () => {
        xForce = lerp(xForce, 0, easing);
        yForce = lerp(yForce, 0, easing);
        gsap.to(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
        gsap.to(plane2.current, {x: `+=${xForce * 2.0}`, y: `+=${yForce * 0.5}`})
        gsap.to(plane3.current, {x: `+=${xForce * 2.0}`, y: `+=${yForce * 0.25}`})

        if(Math.abs(xForce) < 0.01) xForce = 0;
        if(Math.abs(yForce) < 0.01) yForce = 0;

        if(xForce !== 0 || yForce !== 0){
            requestAnimationFrameId = requestAnimationFrame(animate);
        }
        else{
            if(requestAnimationFrameId !== null) cancelAnimationFrame(requestAnimationFrameId)
            requestAnimationFrameId = null;
        }
    }

    return (<div className="h-fit" >


            <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
                <div ref={plane1} className={styles.plane}>
                    <Image src={floating6} alt='image' width={300} />
                    <Image src={floating9} alt='image' width={325} />
                    <Image src={floating1} alt='image' width={250} />
                </div>
                <div ref={plane2} className={styles.plane}>
                    <Image src={floating4} alt='image' width={250} />
                    <Image src={floating3} alt='image' width={200} />
                    <Image src={floating11} alt='image' width={225} />
                </div>
                <div ref={plane3} className={styles.plane}>
                    <Image src={floating5} alt='image' width={150} />
                    <Image src={floating2} alt='image' width={150} />
                </div>
                <div className={styles.title}>
                    <h1 className={"text-center text-8xl font-bold font-sans text-slate-50 animate-focus-in-expand-fwd"}> Melodio 🌍</h1>
                    <p className={"animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em]  drop-shadow-sm"}>Explore the world through music</p>

                    <Button onClick={() => {
                        // Redirect to the login page
                        router.push("/explore")} } className="w-1/3 justify-center bg-spotify-green text-stone-100 rounded-xl mx-auto my-4 flex hover:bg-slate-300  -top-2 transition delay-7000 duration-800 ease-in-out">
                        Explore
                    </Button>

                </div>
                <div
                    className={"flex-grow-0 transition-all  mt-4  justify-center items-center flex animate-pulse relative " }>
                </div>
            </main>
        </div>
    );
}

export default HeroSection;
