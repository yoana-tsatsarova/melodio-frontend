"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const ScrollContext = React.createContext<{
  scrollY: number;
  children?: React.ReactNode;
}>({
  scrollY: 0,
});
type Props = {
  children?: React.ReactNode;
};

const ScrollObserver: React.FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, children }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollObserver;
