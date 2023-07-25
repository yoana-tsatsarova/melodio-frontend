import AuthForm from "./auth-form";
import Marquee from "react-fast-marquee";
import Login from "@/app/login";

const Header = () => (
  <h1 className={"text-center text-7xl font-bold text-slate-50"}>
    Melodio World of songs 🌍
  </h1>
);

const MarqueeNames = () => (
  <Marquee className={"text-center text-7xl font-bold text-slate-50"}>
    JAVA PUFFS - Togrul - Yoana - Carolina - Ryan
  </Marquee>
);

export default function Home() {
  return (
    <>
      <div className={"flex flex-col items-center"}>
        <Header />
        <MarqueeNames />
     <Login />
      </div>
    </>
  );
}
