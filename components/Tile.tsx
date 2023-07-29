"use client";
import React, { useContext, useRef } from "react";
import Image from "next/legacy/image";
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

          <h1 className="text-stone-400 mb-8 pl-7 font-mono">Yoana Tsatsarova</h1>
          <Balancer>
        <p className="text-4xl font-mono md:text-2xl max-w-2xl container text-stone-500">
            Hey there, I'm Yoana, a 20-year-old who's all about fun and learning! Programming is like an awesome game to me - I love solving problems and getting that sweet sense of achievement. Besides coding, I'm into reading, singing, dancing, and MUSIC! I'm always up for new challenges and working with others to achieve cool stuff together 🎤 🎼 📖
        </p>

          </Balancer>
      </WorkLeft>
      <WorkRight progress={progress}>
          <div className="flex justify-center">
              <img className=" rounded-xl shadow-2xl object-cover"
                     width={850}
                     height={1000}
                  src="/images/yoana.jpg"
                  alt="Awesome Project 1"
                  sizes="100vw"
                  style={{
                      width: "auto",
                      height: "auto",
                  }}
              />
          </div>
      </WorkRight>
    </WorkContainer>
  ),
  Togrul: ({ progress }) => (
    <WorkContainer>
      <WorkRight progress={progress}>

          <Image className=" rounded-xl shadow-2xl object-cover"
                 width={850}
                 height={1000}
          src="/images/togrul.jpg"
          alt="Awesome Project 2"
          sizes="100vw"
          style={{
              width: "auto",
              height: "auto",
          }}
        />
      </WorkRight>
        <WorkLeft progress={progress}>
            <h1 className="text-stone-400 mb-8 pl-7 font-mono">Togrul Hasanbeyli</h1>
            <Balancer>
                <p className="text-4xl font-mono md:text-2xl max-w-2xl container text-stone-500">
                    I am a Fullstack Java Developer 👨🏽‍💻 with a professional background in Environmental Engineering 👷🏽‍♂️. I am travelling a lot with my photography passion and meanwhile I am  tasting traditional foods,  I can not cook you a food but i can cook you something nice with coding 👨🏽‍🍳.
                </p>

            </Balancer>
        </WorkLeft>
    </WorkContainer>
  ),
  Carolina: ({ progress }) => (
    <WorkContainer>
        <WorkLeft progress={progress}>

            <h1 className="text-stone-400 mb-8 pl-7 font-mono">Carolina Nichita</h1>
            <Balancer>
                <p className="text-4xl font-mono md:text-2xl max-w-2xl container text-stone-500">
                    Experienced Java Full-Stack Developer with an accountancy background and valuable internship experience at SALT.  My work on diverse projects honed my problem-solving skills and deepened my understanding of software development.
                    Driven by a passion for learning and embracing new technologies. I thrive in dynamic and collaborative environments. Beyond my career, I am a devoted parent to my two daughters 👩‍👧‍👧, whose journey has enriched my growth as a developer 👩🏽‍💻.</p>
            </Balancer>
        </WorkLeft>
      <WorkRight progress={progress}>
          <Image className=" rounded-xl shadow-2xl object-cover"
                 width={850}
                 height={1000}
          src="/images/carolina.jpg"
          alt="Awesome Project 3"

          style={{
              width: "auto",
              height: "auto",
          }}
        />
      </WorkRight>
    </WorkContainer>
  ),
    Ryan: ({ progress }) => (
        <WorkContainer>
            <WorkRight progress={progress}>
                <Image className=" rounded-xl shadow-2xl object-cover"
                       width={850}
                       height={1000}
                    src="/images/ryan.webp"
                    alt="Awesome Project 3"
                    sizes="100vw"
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                />
            </WorkRight>
            <WorkLeft progress={progress}>
                <h1 className="text-stone-500 mb-8 pl-7 font-mono">Ryan Lisse</h1>
                <Balancer>
                    <p className="text-4xl font-mono md:text-2xl max-w-2xl container text-stone-500">
                        👋 Hi, I’m @RyanLisse
                        🏆 I’m a creative, marketer and a full-stack developer
                        Currently working as Software Consultant @Salt
                        👨🏾‍🦱👩🏾🐶 Proud father of two kids and a dog
                        🇳🇱 Born in Amsterdam roots from Suriname 🇸🇷
                        👩🏾‍🦱 My Mom Was teaching Computer Basics BEFORE the Internet Was A Thing....
                        🎹 With 20+ years of experience in the music and entertainment scene
                    </p>
                </Balancer>
            </WorkLeft>
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
