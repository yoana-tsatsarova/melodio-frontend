import React, { ReactNode } from "react";
interface TileBackgroundProps {
  children: ReactNode;
}
const TileBackground: React.FC<TileBackgroundProps> = ({ children }) => (
  <div className="absolute h-full w-full">{children}</div>
);

export default TileBackground;
