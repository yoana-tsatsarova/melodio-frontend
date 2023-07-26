import Image from "next/image";
import React from "react";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <Image
        src="/logo.png"
        width={65}
        height={65}
        alt="logo"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
};

export default Navbar;
