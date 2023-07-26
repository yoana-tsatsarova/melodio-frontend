"use client";
import Image from 'next/image';
import styles from '../app/page.module.scss';
import { useRef, MouseEvent } from 'react';
import gsap from 'gsap';
import floating1 from '../public/images/img_1.jpg';
import floating2 from '../public/images/img_2.jpg';
import floating3 from '../public/images/img_3.jpg';
import floating4 from '../public/images/img_4.jpg';
import floating5 from '../public/images/img_5.jpg';
import floating9 from '../public/images/img_9.jpg';
import floating11 from '../public/images/img_11.jpg';

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

    const animate = () => {
        xForce = lerp(xForce, 0, easing);
        yForce = lerp(yForce, 0, easing);
        gsap.to(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
        gsap.to(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
        gsap.to(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

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

    return (
        <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
            <div ref={plane1} className={styles.plane}>
                <Image src={floating5} alt='image' width={300} />
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
                <h1 className={"text-center text-8xl font-bold text-slate-50 animate-focus-in-expand-fwd"}> Melodio 🌍</h1>
                <p className={"animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em]  drop-shadow-sm"}>Helping you Explore the world through music</p>
            </div>
        </main>
    );
}

export default HeroSection;
