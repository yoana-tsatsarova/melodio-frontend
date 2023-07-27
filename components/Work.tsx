import React, { ReactNode } from "react";
import Link from "next/link";
interface WorkContainerProps {
  children: ReactNode;
}

const WorkContainer: React.FC<WorkContainerProps> = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
    {children}
  </div>
);

interface WorkbackgroundProps {
  children: ReactNode;
}

const Workbackground: React.FC<WorkbackgroundProps> = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full sticky top-0">
    <div className="bg-gray-1000 h-[30vh] lg:h-auto"></div>
    <div className="bg-zinc-50 h-[70vh] lg:min-h-screen">{children}</div>
  </div>
);

interface WorkLeftProps {
  children: ReactNode;
  progress: number;
}

const WorkLeft: React.FC<WorkLeftProps> = ({ children, progress }) => {
  const translateY = Math.max(0, 50 - progress * 3 * 50) * -1;
  const translateYMax = Math.max(-50, -(progress - 0.85) * 2 * 50) * -1;
  const transformStyle = { transform: `translateY(${translateY}px)` };
  const transformStyleMax = { transform: `translateY(${translateYMax}px)` };
  const style = progress > 0.85 ? transformStyleMax : transformStyle;

  return (
    <div
      className="flex flex-col items-center justify-center text-3xl lg:text-5xl mx-auto h-[30vh] lg:h-auto"
      style={style}>
      <div className="leading-10">{children}</div>
    </div>
  );
};

interface WorkRightProps {
  children: ReactNode;
  progress: number;
}

const WorkRight: React.FC<WorkRightProps> = ({ children, progress }) => {
  const translateY = Math.max(-50, -(progress - 0.5) * 50);
  const translateYMax = Math.max(-50, -(progress - 0.85) * 2 * 50) * -1;
  const transformStyle = { transform: `translateY(${translateY}px)` };
  const transformStyleMax = { transform: `translateY(${translateYMax}px)` };
  const style = progress > 0.85 ? transformStyleMax : transformStyle;

  return (
    <div
      className="flex flex-1 lg:items-center justify-center h-screen"
      style={style}>
      <div className="w-full max-w-md pt-10 lg:pt-0 px-10 md:px-0">
        {children}
      </div>
    </div>
  );
};
interface WorkLinksProps {
  href: string;
  children: ReactNode;
}

const WorkLinks: React.FC<WorkLinksProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      {children}
    </Link>
  );
};

export { WorkContainer, Workbackground, WorkLeft, WorkRight, WorkLinks };
