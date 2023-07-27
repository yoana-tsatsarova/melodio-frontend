import React, { ReactNode } from "react";
import Tile from "./Tile";
import TileBackground from "./TileBackground";
import TileContent from "./TileContent";
import TileWrapper from "./TileWrapper";
import { Workbackground } from "./Work";

type Props = {
  children?: React.ReactNode;
};

const Works = ({ children }: Props) => (
  <TileWrapper numOfPages={4}>
    <TileBackground>
      <Workbackground>{children}</Workbackground>
    </TileBackground>
    <TileContent>
      <Tile page={0} renderContent="Yoana" />
    </TileContent>
    <TileContent>
      <Tile page={1} renderContent="Togrul" />
    </TileContent>
    <TileContent>
      <Tile page={2} renderContent="Carolina" />
    </TileContent>
      <TileContent>
          <Tile page={3} renderContent="Ryan" />
      </TileContent>
  </TileWrapper>
);

export default Works;
