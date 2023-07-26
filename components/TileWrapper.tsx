"use client";
import React, { useRef, useContext } from "react";
import { ScrollContext } from "@/lib/ScrollObserver";

interface WrapperProps {
  numOfPages: number;
  children: any;
}

interface TileContextValue {
  numOfPages: number;
  currentPage: number;
}

export const TileContext = React.createContext<TileContextValue>({
  numOfPages: 0,
  currentPage: 0,
});

const TileWrapper: React.FC<WrapperProps> = ({ children, numOfPages }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);
  let currentPage = 0;
  const { current: elContainer } = refContainer;
  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    currentPage = percentY * numOfPages;
  }
  return (
    <TileContext.Provider value={{ numOfPages, currentPage }}>
      <div
        ref={refContainer}
        style={{ height: numOfPages * 100 + "vh" }}
        className="relative bg-gray-1000 text-zinc-50">
        {children}
      </div>
    </TileContext.Provider>
  );
};

export default TileWrapper;
