"use client";
import React, { useContext, useRef } from "react";
import Image from "next/image";
import { TileContext } from "./TileWrapper";
import { WorkContainer, WorkLeft, WorkRight } from "./Work";
import Balancer from "react-wrap-balancer";
import {Github, Linkedin} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Props {
  page: number;
  renderContent: string;
}

interface Components {
  [key: string]: React.FC<{ progress: number }>;
}
interface WorkbackgroundProps {
  backgroundColor: string;
  backgroundImage: string;
  overlayColor?: string;
  children?: React.ReactNode;
}
const components: Components = {
  Yoana: ({ progress }) => (
    <WorkContainer>
      <WorkLeft progress={progress}>

          <h1 className="mb-8 pl-5 font-mono">Yoana Tsatsarova</h1>
          <Balancer>
        <p className="text-4xl font-mono md:text-2xl max-w-2xl container text-stone-300">
            Hey there, I'm Yoana, a 20-year-old who's all about fun and learning! Programming is like an awesome game to me - I love solving problems and getting that sweet sense of achievement. Besides coding, I'm into reading, singing, dancing, and MUSIC! I'm always up for new challenges and working with others to achieve cool stuff together 🎤 🎼 📖
        </p>

          </Balancer>
      </WorkLeft>
      <WorkRight progress={progress}>
        <Image
          width={840}
          height={1620}
          src="/images/yoana.jpg"
          alt="Awesome Project 1"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </WorkRight>
    </WorkContainer>
  ),
  Togrul: ({ progress }) => (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div>We Built</div>
        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
          Awesome Project 2
        </div>
      </WorkLeft>
      <WorkRight progress={progress}>
        <Image
          width={840}
          height={1620}
          src="/bg-ryan-1.png"
          alt="Awesome Project 2"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </WorkRight>
    </WorkContainer>
  ),
  Carolina: ({ progress }) => (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div>We Built</div>
        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
          Awesome Project 3
        </div>
      </WorkLeft>
      <WorkRight progress={progress}>
        <Image
          width={840}
          height={1620}
          src="/bg-ryan-1.png"
          alt="Awesome Project 3"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </WorkRight>
    </WorkContainer>
  ),
    Ryan: ({ progress }) => (
        <WorkContainer>
            <WorkLeft progress={progress}>
                <div>We Built</div>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                    Awesome Project 3
                </div>
            </WorkLeft>
            <WorkRight progress={progress}>
                <Image
                    width={840}
                    height={1620}
                    src="/bg-ryan-1.png"
                    alt="Awesome Project 3"
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />
            </WorkRight>
        </WorkContainer>
    ),
};

const Tile: React.FC<Props> = ({ page, renderContent }) => {
  const { currentPage, numOfPages } = useContext(TileContext);
  const refContainer = useRef<HTMLDivElement>(null);
  const progress = Math.max(0, currentPage - page);
  let opacity = Math.min(1, Math.max(0, progress * 4));
  if (progress > 0.85 && page < numOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4);
  }

  const Component = components[renderContent];
  return (
    <div
      ref={refContainer}
      className="absolute top-0 w-full"
      style={{
        pointerEvents: progress >= 0 || progress >= 1 ? "none" : undefined,
        opacity,
      }}>
      <Component progress={progress} />
    </div>
  );
};

export default Tile;
