import React, { ReactNode } from "react";

interface TileContentProps {
  children: ReactNode;
}

const TileContent: React.FC<TileContentProps> = ({ children }) => (
  <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
);

export default TileContent;
