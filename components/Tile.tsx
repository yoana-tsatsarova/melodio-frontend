"use client";
import React, { useContext, useRef } from "react";
import Image from "next/image";
import { TileContext } from "./TileWrapper";
import { WorkContainer, WorkLeft, WorkRight } from "./Work";

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
  Foo: ({ progress }) => (
    <WorkContainer>
      <WorkLeft progress={progress}>
        <div>We Built</div>
        <div className="text-4xl md:text-5xl font-semibold tracking-tight">
          Awesome Project 1
        </div>
      </WorkLeft>
      <WorkRight progress={progress}>
        <Image
          width={840}
          height={1620}
          src="/bg-ryan-1.png"
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
  Bar: ({ progress }) => (
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
  Baz: ({ progress }) => (
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
